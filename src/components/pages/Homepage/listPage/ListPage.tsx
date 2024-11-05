import React, {useEffect, useState} from 'react';
import {connect, useSelector} from "react-redux";
import FlipMove from "react-flip-move";
import {useParams} from 'react-router-dom';
import {IoMdCreate, IoMdSearch} from "react-icons/io";
import {Button, Form, InputGroup, ProgressBar} from "react-bootstrap";

import {getShoppingList, updateListRequest} from "../../../../actions/shoppingLists";
import {updateProductsListRequest} from "../../../../actions/products";
import {addProductToList, deleteProductFromList} from "../../../../actions/products";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import {Filter} from "./filter";

import './categorieSpritePositions.less';
import './styles.less';
import {MdFilterListAlt} from "react-icons/md";
import {ProductCategories} from "../../../../types/types";
import {getCurrencySymbol} from "../../../../helpers/helper";

const ListPage = ({ list, getShoppingList, updateProductsListRequest, updateListRequest }) => {
    const { listId } = useParams();

    const [checkedProds, setCheckedProds] = useState([]);
    const [uncheckedProds, setUncheckedProds] = useState([]);
    const [product, setProduct] = useState({});
    const [listName, setListName] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [showFilterModal, setFilterShowModal] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([...ProductCategories]);

    const handleApply = () => setAddShowModal(false);
    const handleClose = () => setAddShowModal(false);
    const handleApplyEdit = () => setEditShowModal(false);
    const handleCloseEdit = () => setEditShowModal(false);
    const handleCloseFilter = () => setFilterShowModal(false);
    const theme = useSelector(state => state.settings.theme);
    const country = useSelector(state => state.user.user.country);

    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    useEffect(() => {
        getShoppingList(listId);
    }, [listId, getShoppingList]);

    useEffect(() => {
        if (Object.keys(list).length) {
            setListName(list.name.value);
            document.title = list.name.value;
            if (list.products) {
                let checked = [];
                list.products.forEach(prod => {
                    prod.checked ?
                        checked.push(prod) :
                        checked.splice(checked.indexOf(prod), 0);
                });
                setCheckedProds(checked);
                setUncheckedProds(list.products.filter(prod => !prod.checked));
            }
        }
    }, [list]);

    const selectProduct = (prod) => {
        setEditShowModal(true);
        setProduct(prod);
    };

    const checkProduct = (selectedProd) => {
        const prod = {
            ...selectedProd,
            productId: selectedProd._id,
            checked: !selectedProd.checked
        };
        updateProductsListRequest(list._id, [prod]);
    };

    useEffect(() => {
        applyFilters();
    }, [searchValue, filteredCategories]);

    const applyFilters = () => {
        if (list.products?.length) {
            const filteredProducts = list.products.filter(prod =>
                filteredCategories.includes(prod.category) &&
                prod.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setUncheckedProds(filteredProducts.filter(prod => !prod.checked));
            setCheckedProds(filteredProducts.filter(prod => prod.checked));
        }
    };

    const filterByCategory = (data) => {
        setFilteredCategories(data);
    };

    return (
        <div className='list-page'>
            <h3>
                {list.name ? list.name.value : ''}
                <InputGroup className='input-wrapper w-25 rounded-2'>
                    <Form.Control
                        value={listName}
                        className='name-input'
                        onBlur={() => listName !== list.name.value && updateListRequest(list, listName)}
                        onChange={(e) => setListName(e.target.value)}
                        type="text" />
                    <IoMdCreate className='name-icon' />
                </InputGroup>
                <InputGroup className='input-wrapper w-25 rounded-2'>
                    <Form.Control
                        value={searchValue}
                        className='name-input'
                        onBlur={() => {}}
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text" />
                    <IoMdSearch className='name-icon' />
                </InputGroup>
                <Button variant={buttonsVariant} onClick={() => setAddShowModal(true)}>Add Product</Button>
                <Button onClick={() => setFilterShowModal(true)}>
                    Filter <MdFilterListAlt />
                </Button>
                {list.products?.length ?
                    <div className='w-100 d-flex flex-nowrap align-items-center px-2 mx-auto'>
                        <ProgressBar
                            className='mt-1 w-100 progress-line'
                            now={list.products.filter(item => item.checked).length}
                            max={list.products.length}
                        />
                    </div>
                    : null}
                <div className='prices w-75 mx-auto'>
                    <div>
                        <span>Purchased Total: </span>
                        <span>{list.products?.length && list.products.reduce(
                            (accumulator, prod) => prod.checked ? accumulator + parseFloat(prod.price) : accumulator, 0
                        )} {getCurrencySymbol(country)}
                        </span>
                    </div>
                    <div>
                        <span>Remaining Total: </span>
                        <span>{list.products?.length && list.products.reduce(
                            (accumulator, prod) => !prod.checked ? accumulator + parseFloat(prod.price ?? 0) : accumulator, 0
                        )} {getCurrencySymbol(country)}
                        </span>
                    </div>
                    <div>
                        <span>Total: </span>
                        <span>{list.products?.length && list.products.reduce(
                            (accumulator, prod) => accumulator + parseFloat(prod.price ?? 0), 0
                        )} {getCurrencySymbol(country)}
                        </span>
                    </div>
                </div>
            </h3>
            <div className='list'>
                {uncheckedProds.length ? <FlipMove className='flip'>
                    {uncheckedProds.map(prod => <div className='d-flex w-75 justify-content-between mb-2' key={prod._id}>
                        <div className='d-flex w-100 align-items-center ml-2'>
                            <Form.Check
                                type={'checkbox'}
                                className='mx-3'
                                checked={prod.checked}
                                onChange={() => checkProduct(prod)}
                                id={prod._id}
                            />
                            <Button
                                variant={buttonsVariant}
                                className='my-1 mx-2 w-100'
                                onClick={() => selectProduct(prod)}>
                                {prod.name}
                                <div>
                                    <span>{prod.price} {getCurrencySymbol(country)} <span className='x'>✕</span> </span>
                                    <span style={{filter: 'brightness(1)'}}>{prod.count} pc(s)</span>
                                </div>
                            </Button>
                            {prod.avatar ? <Button className='avatar-container' variant={buttonsVariant}>
                                <img src={prod.avatar} alt={prod.category.toLowerCase()}/>
                            </Button> : <div className='avatar-container'>
                                <div className={`sprite sprite-${prod.category.toLowerCase()}`} />
                            </div>}
                        </div>
                    </div>)}
                </FlipMove> : <span>There are no one product</span>}

                {checkedProds.length ? <FlipMove className='flip'>
                    {checkedProds.map(prod => <div className='d-flex w-75 justify-content-between mb-2' key={prod._id}>
                        <div className='d-flex w-100 align-items-center ml-2'>
                            <Form.Check
                                type={'checkbox'}
                                className='mx-3'
                                checked={prod.checked}
                                onChange={() => checkProduct(prod)}
                                id={prod._id}
                            />
                            <Button
                                variant={buttonsVariant}
                                className='my-1 mx-2 w-100'
                                onClick={() => selectProduct(prod)}>
                                {prod.name}
                                <div>
                                    <span>{prod.price} {getCurrencySymbol(country)} <span className='x'>✕</span> </span>
                                    <span style={{filter: 'brightness(1)'}}>{prod.count} pc(s)</span>
                                </div>
                            </Button>
                            {prod.avatar ? <Button className='avatar-container' variant={buttonsVariant}>
                                <img src={prod.avatar} alt={prod.category.toLowerCase()}/>
                            </Button> : <div className='avatar-container'>
                                <div className={`sprite sprite-${prod.category.toLowerCase()}`} />
                            </div>}
                        </div>
                    </div>)}
                </FlipMove> : <span>There are no one product</span>}
            </div>

            <AddProductModal
                show={showAddModal}
                onHide={handleClose}
                onApply={handleApply}
            />
            <EditProductModal
                show={showEditModal}
                product={product}
                onHide={handleCloseEdit}
                onApply={handleApplyEdit}
            />
            <Filter
                show={showFilterModal}
                onHide={handleCloseFilter}
                filterData={filterByCategory} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    list: state.items.list,
    allProducts: state.items.allProducts,
});

const mapDispatchToProps = {
    getShoppingList,
    deleteProductFromList,
    addProductToList,
    updateProductsListRequest,
    updateListRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
