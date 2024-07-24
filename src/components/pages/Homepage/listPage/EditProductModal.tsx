import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal, Form, InputGroup, Col} from "react-bootstrap";
import {deleteProductFromList, updateProductsListRequest} from "../../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";
import {MdAttachMoney, MdShoppingCart} from "react-icons/md";
import {FaPlusMinus} from "react-icons/fa6";
import {useParams} from "react-router-dom";

const EditProductModal = ({product, show, onHide, deleteProductFromList,updateProductsListRequest}) => {
    const { listId } = useParams();
    const [name, setName] = useState('');
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
    const onCloseHandler = () => {
        onHide();
    }
    useEffect(() => {
        setName(product?.name ?? '');
    }, [product]);
    const renameProd = (value) => {
        setName(value);
    }
    const applyRename = () => {
        product.name !== name && updateProductsListRequest(listId, product._id, name);
    }
    return ReactDOM.createPortal(<Modal show={show} onHide={onCloseHandler} className='w-100'>
        <Modal.Header closeButton>
            <Modal.Title>Product Editing</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex align-items-start flex-column modal-fixed-height'>
            <Form.Group as={Col} className='mx-auto'>
                <InputGroup className='my-2'>
                    <Form.Label column sm="2" className='mx-2 w-25'>
                        Product
                    </Form.Label>
                    <Form.Control
                        type="text"
                        onBlur={() => applyRename()}
                        onChange={(e) => renameProd(e.target.value)}
                        value={name ?? ''}
                    />
                    <InputGroup.Text>
                        <MdShoppingCart />
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className='my-2'>
                    <Form.Label column sm="2" className='mx-2 w-25'>
                        Count
                    </Form.Label>
                    <Form.Control
                        type="number"
                        onChange={() => {}}
                        value={product?.count || 1}
                    />
                    <InputGroup.Text>
                        <FaPlusMinus />
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className='my-2'>
                    <Form.Label column sm="2" className='mx-2 w-25'>
                        Price
                    </Form.Label>
                    <Form.Control
                        type="number"
                        onChange={() => {}}
                        value={product?.count || 0.00}
                    />
                    <InputGroup.Text>
                        <MdAttachMoney />
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className='my-2'>
                    <Form.Label column sm="2" className='mx-2 w-25'>
                        Category
                    </Form.Label>
                    <Form.Select
                        aria-label="gender"
                        onChange={() => {}}
                        value={'vegetables'}>
                        <option value="other">Other</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="meat">Meat</option>
                        <option value="bakery">Bakery</option>
                    </Form.Select>
                </InputGroup>
                <Button
                    onClick={() => {
                        deleteProductFromList(listId, product._id);
                        onCloseHandler();
                    }}
                    variant={buttonsVariant}>Remove Product</Button>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer/>
    </Modal>, document.body);
};
const mapStateToProps = (state) => ({
    list: state.items.list,
});
const mapDispatchToProps = {
    deleteProductFromList,
    updateProductsListRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);