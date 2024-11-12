import React, {useEffect, useState, useCallback} from 'react';
import {connect} from "react-redux";
import FlipMove from "react-flip-move";
import {useNavigate, useParams} from 'react-router-dom';
import {IoMdCreate, IoMdPersonAdd, IoMdSearch, IoMdTrash} from "react-icons/io";
import {Button, ButtonGroup, Dropdown, Form, InputGroup, ProgressBar} from "react-bootstrap";

import {getShoppingList, removeListRequest, updateListRequest} from "../../../../actions/shoppingLists";
import {updateProductsListRequest} from "../../../../actions/products";
import {addProductToList, deleteProductFromList} from "../../../../actions/products";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import {Filter} from "./filter";

import './categorieSpritePositions.less';
import './styles.less';
import {MdFilterListAlt} from "react-icons/md";
import {ProductCategories} from "../../../../types/types";
import {debounce, getCurrencySymbol} from "../../../../helpers/helper";
import {FiMoreHorizontal} from "react-icons/fi";
import ShareListModal from "../shareListModal";

const ListPage = ({user, list, getShoppingList, updateProductsListRequest, updateListRequest, removeListRequest }) => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const [checkedProds, setCheckedProds] = useState([]);
    const [uncheckedProds, setUncheckedProds] = useState([]);
    const [product, setProduct] = useState({});
    const [listName, setListName] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [showFilterModal, setFilterShowModal] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([...ProductCategories]);
    const [showSharingModal, setSharingModal] = useState(false);

    const handleApply = () => setAddShowModal(false);
    const handleClose = () => setAddShowModal(false);
    const handleApplyEdit = () => setEditShowModal(false);
    const handleCloseEdit = () => setEditShowModal(false);
    const handleCloseFilter = () => setFilterShowModal(false);

    useEffect(() => {
        getShoppingList(listId, user.id, navigate);
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
    const updateListRequestDebounced = useCallback(
        debounce((list, value) => {
            updateListRequest(list, value);
        }, 500),
        []
    );
    const handleInputChange = (e) => {
        const value = e.target.value;
        setListName(value);
        if (value) updateListRequestDebounced(list, value);
    };
    const handleCloseSharingModal = () => {
        setSharingModal(false);
    };
    return (
        <div className='list-page'>
            <h3 className='list-header p-3'>
                <div className="d-flex  flex-sm-row flex-column justify-content-between ">
                    <InputGroup className='input-wrapper rounded-2'>
                        <Form.Control
                            value={listName}
                            className='name-input rounded'
                            onChange={handleInputChange}
                            type="text"
                        />
                        <IoMdCreate className='name-icon'/>
                    </InputGroup>
                    <InputGroup className='input-wrapper search rounded'>
                        <Form.Control
                            value={searchValue}
                            className='name-input rounded'
                            onBlur={() => {}}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text" />
                        <IoMdSearch className='name-icon' />
                    </InputGroup>
                    <div className="actions d-flex flex-row flex-nowrap">
                        <Button onClick={() => setAddShowModal(true)} className='add'>Add Product</Button>
                        <Dropdown as={ButtonGroup} className='extra-actions'>
                            <Dropdown.Toggle className='dropdown-without-arrow'>
                                <FiMoreHorizontal />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='section-styled-bg'>
                                <Dropdown.Item eventKey="1" onClick={()=> setSharingModal(true)}>
                                    <IoMdPersonAdd /> Share
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={()=> {}}>
                                    <IoMdCreate/> Sort
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={()=> setFilterShowModal(true)}>
                                    <MdFilterListAlt/> Filter
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={async ()=> {
                                    await removeListRequest(user.id, list._id);
                                    navigate(-1);
                                }}>
                                    <IoMdTrash /> Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>


                {list.products?.length ?
                    <>
                        <div className='position-relative w-100 d-flex flex-nowrap align-items-center px-2 mx-auto'>
                            <ProgressBar
                                className='my-2 w-100 progress-line'
                                now={list.products.filter(item => item.checked).length}
                                max={list.products.length}
                            />
                            <span className='progress-count'>{list.products.filter(item => item.checked).length} / {list.products.length}</span>
                        </div>
                        <div className='prices mx-auto'>
                            <div>
                                <span className='subtitle'>Purchased</span>
                                <span>{list.products?.length && list.products.reduce(
                                    (accumulator, prod) => prod.checked ? accumulator + parseFloat(prod.price) : accumulator, 0
                                )} {getCurrencySymbol(user.country)}
                                </span>
                            </div>
                            <div>
                                <span className='subtitle'>Remaining</span>
                                <span>{list.products?.length && list.products.reduce(
                                    (accumulator, prod) => !prod.checked ? accumulator + parseFloat(prod.price ?? 0) : accumulator, 0
                                )} {getCurrencySymbol(user.country)}
                                </span>
                            </div>
                            <div>
                                <span className='subtitle'>Total</span>
                                <span>
                                    {list.products?.length && list.products.reduce(
                                    (accumulator, prod) => accumulator + parseFloat(prod.price ?? 0), 0
                                    )} {getCurrencySymbol(user.country)}
                                </span>
                            </div>
                        </div>
                    </>
                    : <div className='text-center my-2 mx-auto'>This list is empty</div>}

            </h3>
            <div className='list'>
                {uncheckedProds.length ? <FlipMove className='flip'>
                    {uncheckedProds.map(prod => <div className='d-flex justify-content-between mb-2 w-100' key={prod._id}>
                        <div className='d-flex w-100 align-items-center ml-2'>
                            <Form.Check
                                type={'checkbox'}
                                className='prod-checkbox mx-3'
                                checked={prod.checked}
                                onChange={() => checkProduct(prod)}
                                id={prod._id}
                            />
                            <Button
                                className='my-1 w-100 section-styled-bg'
                                onClick={() => selectProduct(prod)}>
                                <h5>{prod.name}</h5>
                                <div>
                                    <span className='subtitle'>{prod.price} {getCurrencySymbol(user.country)} <span className='x'>✕</span> </span>
                                    <span className='subtitle'>{prod.count} pc(s)</span>
                                </div>
                            </Button>
                            {prod.avatar ? <Button className='avatar-container mx-3 section-styled-bg'>
                                <img src={prod.avatar} alt={prod.category.toLowerCase()}/>
                            </Button> : <div className='avatar-container mx-3 section-styled-bg'>
                                <div className={`sprite sprite-${prod.category.toLowerCase()}`} />
                            </div>}
                        </div>
                    </div>)}
                </FlipMove> : null}

                {checkedProds.length && uncheckedProds.length ? <div className='separator section-styled-bg'/> : null}
                {checkedProds.length ? <FlipMove className='flip'>
                    {checkedProds.map(prod => <div className='d-flex justify-content-between mb-2 w-100' key={prod._id}>
                        <div className='d-flex w-100 align-items-center ml-2'>
                            <Form.Check
                                id={prod._id}
                                type={'checkbox'}
                                className='prod-checkbox mx-3'
                                checked={prod.checked}
                                onChange={() => checkProduct(prod)}
                            />
                            <Button
                                className='my-1 w-100 section-styled-bg'
                                onClick={() => selectProduct(prod)}>
                                <h5>{prod.name}</h5>
                                <div>
                                    <span className='subtitle'>{prod.price} {getCurrencySymbol(user.country)} <span className='x'>✕</span> </span>
                                    <span className='subtitle'>{prod.count} pc(s)</span>
                                </div>
                            </Button>
                            {prod.avatar ? <Button className='avatar-container mx-3 section-styled-bg'>
                                <img src={prod.avatar} alt={prod.category.toLowerCase()}/>
                            </Button> : <div className='avatar-container mx-3 section-styled-bg'>
                                <div className={`sprite sprite-${prod.category.toLowerCase()}`} />
                            </div>}
                        </div>
                    </div>)}
                </FlipMove> : null}
            </div>
            {showSharingModal && <ShareListModal
                show={showSharingModal}
                onHide={handleCloseSharingModal}
                onApply={handleApply}
            />}
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
    user: state.user.user,
});

const mapDispatchToProps = {
    getShoppingList,
    deleteProductFromList,
    addProductToList,
    updateProductsListRequest,
    updateListRequest,
    removeListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
