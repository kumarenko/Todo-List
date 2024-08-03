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

    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    useEffect(() => {
        getShoppingList(listId);
    }, [listId, getShoppingList]);

    useEffect(() => {
        setListName(list.name);
        document.title = list.name;
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
                {list.name}
                <InputGroup className='input-wrapper w-25 rounded-2'>
                    <Form.Control
                        value={listName}
                        className='name-input'
                        onBlur={() => listName !== list.name && updateListRequest(list, listName)}
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
                <Button onClick={() => setFilterShowModal(true)}>
                    Filter <MdFilterListAlt />
                </Button>
                {list.products?.length ?
                    <div>
                        <ProgressBar
                            className='mt-1'
                            now={list.products.filter(item => item.checked).length}
                            max={list.products.length}
                        />
                        <div>
                            {list.products.filter(item => item.checked).length} / {list.products.length}
                        </div>
                    </div>
                    : null}
            </h3>
            <div className='list'>
                {checkedProds.length ? <FlipMove>
                    {checkedProds.map(prod => <div className='d-flex align-items-center' key={prod._id}>
                        <Form.Check
                            type={'checkbox'}
                            checked={prod.checked}
                            onChange={() => checkProduct(prod)}
                            id={prod._id}
                        />
                        <Button
                            variant={buttonsVariant}
                            className='my-1'
                            onClick={() => selectProduct(prod)}>
                            {prod.name} <span style={{filter: 'brightness(0.5)'}}>{prod.count}</span>
                        </Button>
                        {prod.price ? <span> {prod.price} $</span> : null}
                        {prod.category ? <span> {prod.category}</span> : null}
                        {prod.category ? <div className={`sprite sprite-${prod.category.toLowerCase()}`} />
                            : null}
                    </div>)}
                </FlipMove> : <span>There are no one product</span>}
                {uncheckedProds.length ? <FlipMove>
                    {uncheckedProds.map(prod => <div className='d-flex align-items-center' key={prod._id}>
                        <Form.Check
                            type={'checkbox'}
                            checked={prod.checked}
                            onChange={() => checkProduct(prod)}
                            id={prod._id}
                        />
                        <Button
                            variant={buttonsVariant}
                            className='my-1'
                            onClick={() => selectProduct(prod)}>
                            {prod.name} <span style={{filter: 'brightness(0.5)'}}>{prod.count}</span>
                        </Button>
                        {prod.price ? <span> {prod.price} $</span> : null}
                        {prod.category ? <span> {prod.category}</span> : null}
                        {prod.category ? <div className={`sprite sprite-${prod.category.toLowerCase()}`} />
                            : null}
                    </div>)}
                </FlipMove> : <span>There are no one product</span>}
            </div>

            <Button variant={buttonsVariant} onClick={() => setAddShowModal(true)}>Add Product</Button>
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
