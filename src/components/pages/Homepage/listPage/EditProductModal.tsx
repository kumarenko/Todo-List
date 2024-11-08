import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal, Form, InputGroup, Col} from "react-bootstrap";
import {updateProductsListRequest} from "../../../../actions/products";
import {deleteProductFromList} from "../../../../actions/products";
import {connect, useSelector} from "react-redux";
import {MdShoppingCart} from "react-icons/md";
import {FaPlusMinus} from "react-icons/fa6";
import {useParams} from "react-router-dom";
import {getCurrencySymbol, preventCharacters} from "../../../../helpers/helper";
import { ProductCategories , ProductCategory} from "../../../../types/types";

const EditProductModal = ({product, show, onHide, deleteProductFromList,updateProductsListRequest}) => {
    const { listId } = useParams();
    const [name, setName] = useState('');
    const [count, setCount] = useState('1');
    const [price, setPrice] = useState('0');
    const [category, setCategory] = useState<ProductCategory | string>('');
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
    const country = useSelector(state => state.user.user.country);

    useEffect(() => {
        if (Object.keys(product).length) {
            setName(product?.name ?? '');
            setCount(product?.count ? product.count : '1');
            setPrice(product?.price ? product.price : '0');
            setCategory(product?.category ?? '' as ProductCategory);
        }
    }, [product]);

    const hasChanges = () => {
        return product.name !== name ||
            parseInt(product.count) !== count ||
            product.price.toString() !== price ||
            product.category !== category;
    }
    const applyUpdate = () => {
        const prod = {
            _id: product._id,
            checked: product.checked,
            name, count, price: parseFloat(price || '0'),
            category,
        }
        if(hasChanges() && price && name && count) {
             updateProductsListRequest(listId, [prod]);
        }
    }
    const deleteProduct = () => {
        const prod = {
            _id: product._id,
        }
        deleteProductFromList(listId, [prod]);
        onHide();
    }

    return ReactDOM.createPortal(<Modal show={show} onHide={() => {
        onHide();
        if (price === '') {
            setPrice(product.price);
        }
        if (count === '') {
            setCount(product.count);
        }
        if (name === '') {
            setCount(product.name);
        }
    }} className='w-100'>
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
                        onChange={(e) => {
                            setCount(e.target.value)
                        }}
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
                        inputMode="decimal"
                        onBlur={() => applyUpdate()}
                        onKeyPress={event => preventCharacters(event)}
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                        value={price}
                    />
                    <InputGroup.Text>
                        <span>{getCurrencySymbol(country)}</span>
                    </InputGroup.Text>
                </InputGroup>
                <InputGroup className='my-2'>
                    <Form.Label column sm="2" className='mx-2 w-25'>
                        Category {category}
                    </Form.Label>
                    <Form.Select
                        aria-label="gender"
                        onBlur={() => applyUpdate()}
                        onChange={(e) => setCategory(e.target.value) as ProductCategory}
                        value={category}>
                        {ProductCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
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