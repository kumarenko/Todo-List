import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal} from "react-bootstrap";
import {addProducts, getAllProducts} from "../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";
import {IoMdAdd, IoMdClose, IoMdRemove} from "react-icons/io";
const AddProductModal = ({addProducts,allProducts, getAllProducts, value = null, show, onHide, onApply}) => {
    const [data, setData] = useState("");
    useEffect(() => {
        getAllProducts();
    }, []);
    function handleClick() {
        onApply(data || value?.name);
        setData('');
    }
    const onCloseHandler = () => {
        onHide();
        setData('');
    }
    const addProduct = (item) => {
        addProducts(item, 1);
    }
    const deleteProduct = (item) => {
        addProducts(item, -1);
    }

    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    return ReactDOM.createPortal(<Modal key={'sdf'} show={show} onHide={onCloseHandler} className='w-100'>
        <Modal.Header closeButton>
            <Modal.Title>Adding new List</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex align-items-start flex-column modal-fixed-height'>
            {allProducts.length ?
                allProducts.map(item => <div  key={item._id} className='position-relative d-flex justify-content-center w-75 mx-auto my-1'>
                    <Button variant={buttonsVariant} className='rounded-pill w-100 d-flex justify-content-between align-items-center' onClick={() => addProduct(item)}>
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
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClick} disabled={data.length === 0}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>, document.body);
};
const mapStateToProps = (state) => ({
    allProducts: state.items.allProducts
});
const mapDispatchToProps = {
    getAllProducts,
    addProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);