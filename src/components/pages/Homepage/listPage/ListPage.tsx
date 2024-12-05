import React, {useEffect, useState, useCallback} from 'react';
import {connect, useDispatch} from "react-redux";
import FlipMove from "react-flip-move";
import {useNavigate, useParams} from 'react-router-dom';
import {
    IoMdCreate,
    IoMdPersonAdd,
    IoMdSearch,
    IoMdTrash,
    IoMdClose,
    IoIosCopy,
    IoMdAdd,
    IoMdSettings
} from "react-icons/io";
import {Button, ButtonGroup, Dropdown, Form, InputGroup, ProgressBar} from "react-bootstrap";
import { FaSortAmountDown } from "react-icons/fa";

import {getShoppingList, removeListRequest, updateListRequest} from "../../../../actions/shoppingLists";
import {updateProductsListRequest} from "../../../../actions/products";
import {addProductToList, deleteProductFromList} from "../../../../actions/products";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import FilterModal from "./filter";

import './categorieSpritePositions.less';
import './styles.less';
import currencies from './../../../../configs/currencies.json';
import {MdFilterListAlt} from "react-icons/md";
import {debounce, getCurrencySymbol, onlyUnique} from "../../../../helpers/helper";
import {FiMoreHorizontal} from "react-icons/fi";
import ShareListModal from "../shareListModal";
import {defaultListsState, setShoppingList} from "../../../../redux/shoppingListsReducer";
import DeleteListModal from "../deleteListModal";
import SortingModal from "./sorting";
import AvatarModal from "./avatar";
import {t} from "i18next";
import Footer from "../../../../common/footer";
import CopyListModal from "../copyListModal";
import ProductPlaceholder from "../../../../common/productPlaceholder";
import ParametersListModal from "./parameters";

const ListPage = ({user, list, getShoppingList, updateProductsListRequest, updateListRequest, removeListRequest }) => {
    const { listId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [prods, setProds] = useState([]);
    const [product, setProduct] = useState({});
    const [listName, setListName] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [showAddModal, setAddShowModal] = useState(false);
    const [showEditModal, setEditShowModal] = useState(false);
    const [showFilterModal, setFilterShowModal] = useState(false);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [showSharingModal, setSharingModal] = useState(false);
    const [showCopyModal, setCopyModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showParametersModal, setShowParametersModal] = useState(false);
    const [toggleSortingModal, setToggleSortingModal] = useState(false);
    const [toggleAvatarModal, setToggleAvatarModal] = useState(false);
    const [item, setItem] = useState(null);
    const [sortingType, setSortingType] = useState('default');
    const [loading, setLoading] = useState(false);

    const handleApply = () => setAddShowModal(false);
    const handleClose = () => setAddShowModal(false);
    const handleApplyEdit = () => setEditShowModal(false);
    const handleCloseEdit = () => setEditShowModal(false);
    const handleCloseFilter = () => setFilterShowModal(false);
    const handleCloseDelete = () => setShowDeleteModal(false);
    const handleCloseParameters = () => setShowParametersModal(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getShoppingList(listId, user.id, navigate);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setShoppingList(defaultListsState.list));
        }
    }, []);
    useEffect(() => {
        setListName(list.name.value);
        if (list.name.value) {
            document.title = `${t('List')} - ${list.name.value}`;
        }
    }, [list.name]);

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
    }, [searchValue, filteredCategories, list, sortingType]);
    const applyFilters = () => {
        let filteredProducts = list.products.filter(
            prod =>
                filteredCategories.includes(prod.category) &&
                prod.name.toLowerCase().includes(t(searchValue.toLowerCase())),
        );
        if (filteredCategories.length === 0) {
            filteredProducts = list.products.filter(prod =>
                prod.name.toLowerCase().includes(t(searchValue.toLowerCase())),
            );
        }
        setProds(sortProds(filteredProducts));
    };
    const sortProds = array => {
        const sortedArray = [...array];
        switch (sortingType) {
            case 'alphabetical': {
                return sortedArray.sort((a, b) => {
                    if (a.checked === b.checked) {
                        return t(a.name).localeCompare(t(b.name));
                    }
                    return a.checked ? 1 : -1;
                });
            }
            case 'popularity': {
                return sortedArray.sort((a, b) => {
                    if (a.checked === b.checked) {
                        const selectionCountA = a.selectionCount || 0;
                        const selectionCountB = b.selectionCount || 0;
                        return selectionCountB - selectionCountA;
                    }
                    return a.checked ? 1 : -1;
                });
            }
            case 'price': {
                return sortedArray.sort((a, b) => {
                    if (a.checked === b.checked) {
                        const selectionCountA = a.price || 0;
                        const selectionCountB = b.price || 0;
                        return selectionCountB - selectionCountA;
                    }
                    return a.checked ? 1 : -1;
                });
            }
            default: {
                return sortedArray.sort((a, b) => {
                    if (a.checked === b.checked) {
                        return 0;
                    }
                    return a.checked ? 1 : -1;
                });
            }
        }
    };
    const applySort = (type: string) => {
        setSortingType(type);
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
    const handleCloseCopyModal = () => {
        setCopyModal(false);
    };
    const removeList = async () => {
        setShowDeleteModal(false);
        await removeListRequest(user.id, list._id);
        navigate(-1);
    }
    const removeCategoryToFilter = (cat) => {
        const updatedCategories = filteredCategories.filter((category) => category !== cat);
        setFilteredCategories(updatedCategories);
    };

    const renderProducts = () => {
        if(loading) {
            return <ProductPlaceholder/>
        } else {
            return <div className='list'>
                {prods.filter(i => !i.checked).length ? <FlipMove className='flip mx-auto my-1'>
                    {prods.filter(i => !i.checked).map(prod => <div className='d-flex justify-content-between mb-2 w-100' key={prod._id}>
                        <div className='d-flex w-100 align-items-center ml-2'>
                            <Form.Check
                                type={'checkbox'}
                                className='prod-checkbox mx-3'
                                checked={prod.checked}
                                onChange={() => checkProduct(prod)}
                                id={prod._id}
                            />
                            <button
                                className='my-1 w-100 section-styled-bg rounded'
                                onClick={() => selectProduct(prod)}>
                                <h5 className='title text-break'>{t(prod.name)}</h5>
                                <div>
                                    <span className={`subtitle ${parseInt(prod.price) === 0 ? 'd-none' : 'd-inline'}`}>{prod.price}
                                    {currencies.find(curr => curr.code === list.currency)?.symbol || getCurrencySymbol(user.country)}</span>
                                    {<span className={`x subtitle ${parseInt(prod.price) === 0 || parseInt(prod.count) === 0 ? 'opacity-0' : 'opacity-1'}`}> ✕ </span>}
                                    <span className={`subtitle`}>{prod.count} {prod.selectedUnits || t('pcs')}</span>
                                </div>
                            </button>
                            <Button className='avatar-container mx-3 section-styled-bg' onClick={() => {
                                setToggleAvatarModal(true);
                                setItem(prod);
                            }}>
                                {prod.avatar ? <img src={prod.avatar} alt={prod.category.toLowerCase()}/> :
                                    <div className={`sprite sprite-${prod.category.toLowerCase()}`} />}
                            </Button>
                        </div>
                    </div>)}
                </FlipMove> : null}
                {prods.filter(i => i.checked).length ? <div className='flip px-3 mx-auto mb-2'><div className='separator section-styled-bg'/></div> : null}
                {prods.filter(i => i.checked).length ? <FlipMove className='flip pb-5 mx-auto'>
                    {prods.filter(i => i.checked).map(prod => <div className='d-flex justify-content-between mb-2 w-100' key={prod._id}>
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
                                <h5 className='title text-break'>{t(prod.name)}</h5>
                                <div>
                                    <span className={`subtitle ${parseInt(prod.price) === 0 ? 'd-none' : 'd-inline'}`}>
                                        {prod.price}
                                        {currencies.find(curr => curr.code === list.currency)?.symbol || getCurrencySymbol(user.country)}</span>
                                    {<span className={`x subtitle ${parseInt(prod.price) === 0 || parseInt(prod.count) === 0 ? 'opacity-0' : 'opacity-1'}`}> ✕ </span>}
                                    <span className={`subtitle`}>{prod.count} {prod.selectedUnits || t('pcs')}</span>
                                </div>
                            </Button>
                            <Button className='avatar-container mx-3 section-styled-bg' onClick={() => {
                                setToggleAvatarModal(true);
                                setItem(prod);
                            }}>
                                {prod.avatar ? <img src={prod.avatar} alt={prod.category.toLowerCase()}/> :
                                    <div className={`sprite sprite-${prod.category.toLowerCase()}`} />}
                            </Button>
                        </div>
                    </div>)}
                </FlipMove> : null}
            </div>
        }
    }
    return (
        <div className='list-page'>
            <h3 className='list-header pt-5 pt-sm-3 px-3'>
                <div className="d-flex  flex-sm-row flex-column justify-content-between mt-2 mt-sm-0">
                    <InputGroup className='input-wrapper rounded-2'>
                        <Form.Control
                            value={listName}
                            className='input-with-length-numbers name-input rounded pe-5'
                            maxLength={100}
                            onChange={handleInputChange}
                            type="text"
                        />
                        <Form.Label htmlFor="name" className='label-with-length-numbers subtitle'>{listName.length} / 100</Form.Label>
                        <IoMdCreate className='name-icon title'/>
                    </InputGroup>
                    <InputGroup className={`input-wrapper search rounded ${searchValue.length ? 'focused' : ''}`}>
                        <Form.Control
                            value={searchValue}
                            className='name-input rounded'
                            onBlur={() => {}}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text" />
                        <IoMdSearch className='name-icon title' />
                    </InputGroup>
                    <div className="actions d-flex flex-row flex-nowrap justify-content-between">
                        <Button onClick={() => setAddShowModal(true)} className='add'>
                            <IoMdAdd size={16} className='me-1'/>
                            {t('Add product')}
                        </Button>
                        <Dropdown as={ButtonGroup} className='extra-actions'>
                            <Dropdown.Toggle className='dropdown-without-arrow'>
                                <FiMoreHorizontal />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='section-styled-bg'>
                                {user.role === 'USER' ? <Dropdown.Item eventKey="1" onClick={()=> setSharingModal(true)}>
                                    <IoMdPersonAdd /> {t('Share')}
                                </Dropdown.Item> : null}
                                {list.products.length > 0 ? <>
                                        <Dropdown.Item eventKey="2" onClick={()=> setCopyModal(true)}>
                                            <IoIosCopy /> {t('Copy')}
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="3" onClick={()=> setToggleSortingModal(true)}>
                                            <FaSortAmountDown/> {t('Sort')}
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="4" onClick={()=> setFilterShowModal(true)}>
                                            <MdFilterListAlt/> {t('Filter')}
                                        </Dropdown.Item>
                                    </>
                                     : null}
                                <Dropdown.Item eventKey="5" onClick={() => setShowParametersModal(true)}>
                                    <IoMdSettings /> {t('Parameters')}
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="6" onClick={() => setShowDeleteModal(true)}>
                                    <IoMdTrash /> {t('Delete')}
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
                        <div className='prices mx-auto subtitle'>
                            <div>
                                <span className='text-center'>{t('Purchased')}</span>
                                <span className='title text-center'>{list.products?.length && list.products.reduce(
                                    (accumulator, prod) => prod.checked ? accumulator + parseFloat(prod.price) * prod.count : accumulator, 0
                                )} {currencies.find(curr => curr.code === list.currency)?.symbol || getCurrencySymbol(user.country)}
                                </span>
                            </div>
                            <div>
                                <span className='text-center'>{t('Remaining')}</span>
                                <span className='title text-center' >{list.products?.length && list.products.reduce(
                                    (accumulator, prod) => !prod.checked ? accumulator + parseFloat(prod.price ?? 0) * prod.count : accumulator, 0
                                )} {currencies.find(curr => curr.code === list.currency)?.symbol || getCurrencySymbol(user.country)}
                                </span>
                            </div>
                            <div>
                                <span className='text-center'>{t('Total')}</span>
                                <span className='title text-center'>
                                    {list.products?.length && list.products.reduce(
                                    (accumulator, prod) => accumulator + parseFloat(prod.price ?? 0) * prod.count, 0
                                    )} {currencies.find(curr => curr.code === list.currency)?.symbol || getCurrencySymbol(user.country)}
                                </span>
                            </div>
                        </div>
                    </>
                    : <div className='text-center my-2 mx-auto title'>{t('Your list is currently empty. Add your items to make sure you don’t forget anything!')}</div>}
                {filteredCategories.length >= 1 ? <div className='my-2'>
                    {filteredCategories.map(cat => <Button key={cat} className='mx-2' onClick={() => removeCategoryToFilter(cat)}><IoMdClose/>{t(cat)}</Button>)}
                </div> : null}
            </h3>
            {renderProducts()}
            <ShareListModal
                show={showSharingModal}
                onHide={handleCloseSharingModal}
                onApply={handleApply}
            />
            <CopyListModal
                show={showCopyModal}
                onHide={handleCloseCopyModal}
                list={list}
            />
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
            <DeleteListModal
                name={list.name.value}
                show={showDeleteModal}
                onHide={handleCloseDelete}
                onApply={() => removeList()}
            />
            <ParametersListModal
                name={list.name.value}
                show={showParametersModal}
                onHide={handleCloseParameters}
                defaultCurrency={currencies.find(curr => curr.country === user.country).code}
                list={list}
            />
            <FilterModal
                isVisible={showFilterModal}
                onClose={handleCloseFilter}
                categories={list.products.map(prod => prod.category).filter(onlyUnique)}
                filteredCats={filteredCategories}
                onSelectCategory={filterByCategory} />
            <SortingModal
                isVisible={toggleSortingModal}
                onClose={() => setToggleSortingModal(false)}
                sortingType={sortingType}
                onApply={applySort}
            />
            {item ? <AvatarModal
                isVisible={toggleAvatarModal}
                onClose={() => {
                    setToggleAvatarModal(false);
                    setItem(null);
                }}
                product={item}
                listId={list._id}
                type={'products'}
            /> : null}
            <Footer/>
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
