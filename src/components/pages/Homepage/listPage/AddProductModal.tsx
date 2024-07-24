import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal, Form, InputGroup, Col} from "react-bootstrap";
import {addProducts, addProductToList, getAllProducts} from "../../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";
import {IoMdAdd, IoMdClose, IoMdRemove, IoMdSearch} from "react-icons/io";
const AddProductModal = ({list, addProducts,allProducts, getAllProducts, value = null, show, onHide, onApply,addProductToList}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    useEffect(() => {
        getAllProducts();
        setFilteredItems(allProducts);
    }, []);

    useEffect(() => {
        setFilteredItems(allProducts);
    }, [allProducts]);

    const onCloseHandler = () => {
        onHide();
        setTimeout(() => setFilteredItems(allProducts), 500);
    }
    const addProduct = (item) => {
        addProductToList(list._id, item.name)
    }
    const deleteProduct = (item) => {
        addProducts(item, -1);
    }
    const filterProducts = (searchValue) => {
        let filteredItems = allProducts.filter(prod => prod.name.includes(searchValue));
        filteredItems.length > 0 ?
            setFilteredItems(filteredItems) :
            setFilteredItems([{name: searchValue}]);
    }
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    return ReactDOM.createPortal(<Modal show={show} onHide={onCloseHandler} className='w-100'>
        <Modal.Header closeButton>
            <Modal.Title>Adding new Product to List</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex align-items-start flex-column modal-fixed-height'>
            <Form.Group as={Col}>
                <InputGroup>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                            filterProducts(e.target.value);
                        }}
                        placeholder="Search here.."
                    />
                    <InputGroup.Text>
                        <IoMdSearch />
                    </InputGroup.Text>
                </InputGroup>
            </Form.Group>
            {filteredItems.length ?
                filteredItems.map(item => <div  key={item._id} className='position-relative d-flex justify-content-center w-75 mx-auto my-1'>
                    <Button variant={buttonsVariant}
                            className='rounded-pill w-100 d-flex justify-content-between align-items-center'
                            onClick={() => addProduct(item)}>
                        <IoMdAdd className='position-absolute start-0 ms-3'>{item.name}</IoMdAdd>
                        <span className='m-auto'>{item.name}</span>
                        {item.count > 0 ? <span className='position-absolute end-0 me-5'>{item.count}</span>: null}
                    </Button>
                    {item.count > 0 ? <Button variant={buttonsVariant} className='d-flex align-items-center h-100 position-absolute end-0 rounded-circle'
                             onClick={() => deleteProduct(item)}
                    >{item.count > 1 ? <IoMdRemove /> : <IoMdClose/>}
                    </Button> : null}
                </div>) :
            <span>No Items</span>}
        </Modal.Body>
        <Modal.Footer/>
    </Modal>, document.body);
};
const mapStateToProps = (state) => ({
    list: state.items.list,
    allProducts: state.items.allProducts
});
const mapDispatchToProps = {
    getAllProducts,
    addProducts,
    addProductToList,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);