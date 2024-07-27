import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal, Form, InputGroup, Col} from "react-bootstrap";
import {deleteProductFromList, updateProductsListRequest} from "../../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";
import {MdAttachMoney, MdShoppingCart} from "react-icons/md";
import {FaPlusMinus} from "react-icons/fa6";
import {useParams} from "react-router-dom";
import {preventCharacters} from "../../../../helpers/helper";

const EditProductModal = ({product, show, onHide, deleteProductFromList,updateProductsListRequest}) => {
    const { listId } = useParams();
    const [name, setName] = useState('');
    const [count, setCount] = useState(1);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
    useEffect(() => {
        setName(product?.name ?? '');
        setCount(product?.count ? parseInt(product.count) : 1);
        setPrice(product?.price ? parseInt(product.price) : 0);
        setCategory(product?.category ?? '');
    }, [product]);

    const hasChanges = () => {
        console.log(product.name,name,product.count, count,product.price, price,product.category,category)
        return product.name !== name ||
            parseInt(product.count) !== count ||
            parseInt(product.price) !== price ||
            product.category !== category;
    }
    const applyUpdate = () => {
        const prod = {
            productId: product._id,
            checked: product.checked,
            name, count, price,
            category,
        }
        if(hasChanges()) {
             updateProductsListRequest(listId, prod);
        }
    }
    const deleteProduct = () => {
        const prod = {
            productId: product._id,
        }
        deleteProductFromList(listId, prod);
        onHide();
    }
    return ReactDOM.createPortal(<Modal show={show} onHide={onHide} className='w-100'>
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
                        onBlur={() => applyUpdate()}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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
                        onBlur={() => applyUpdate()}
                        min={1}
                        onKeyPress={event => preventCharacters(event)}
                        onChange={(event) => setCount(parseInt(event.target.value))}
                        value={count}
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
                        onBlur={() => applyUpdate()}
                        onKeyPress={event => preventCharacters(event)}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        value={price}
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
                        onBlur={() => applyUpdate()}
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}>
                        <option value="other">Other</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="meat">Meat</option>
                        <option value="bakery">Bakery</option>
                    </Form.Select>
                </InputGroup>
                <Button
                    onClick={() => deleteProduct()}
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