import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Form, InputGroup, Col } from 'react-bootstrap';
import { updateProductsListRequest } from '../../../../actions/products';
import { deleteProductFromList } from '../../../../actions/products';
import { connect, useSelector } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { FaPlusMinus } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import {debounce, getCurrencySymbol, onlyUnique, preventCharacters} from '../../../../helpers/helper';
import allProducts from "../../../../configs/products.json";
import {t} from "i18next";
const allCategories = allProducts.map(prod => prod.category).filter(onlyUnique);

const EditProductModal = ({ product, show, onHide, deleteProductFromList, updateProductsListRequest }) => {
    const { listId } = useParams();
    const [name, setName] = useState(t(product.name));
    const [count, setCount] = useState('1');
    const [price, setPrice] = useState('0');
    const [category, setCategory] = useState<string>('OTHER');
    const country = useSelector(state => state.user.user.country);
    const [debouncedValues, setDebouncedValues] = useState({ name, count, price });

    useEffect(() => {
        if (Object.keys(product).length) {
            setName(t(product.name));
            setCount(product?.count ? product.count : '1');
            setPrice(product?.price ? product.price : 0);
            setCategory(product?.category || 'OTHER');
        }
    }, [product]);

    const applyUpdate = () => {
        const prod = {
            _id: product._id,
            checked: product.checked,
            name, count,
            price: parseFloat(price || '0'),
            category, avatar: product.avatar
        };
        if (price.toString() && name && count.toString()) {
            updateProductsListRequest(listId, [prod]);
        }
    };

    const updateListRequestDebounced = useCallback(
        debounce((updatedValues) => {
            setDebouncedValues(updatedValues);
        }, 500),
        []
    );

    useEffect(() => {
        updateListRequestDebounced({ name, count, price });
    }, [name, count, price, updateListRequestDebounced]);

    useEffect(() => {
        if (debouncedValues.name || debouncedValues.count || debouncedValues.price) {
            if(product.name !== debouncedValues.name ||product.count !== debouncedValues.count ||product.price !== debouncedValues.price) {
                applyUpdate();
            }
        }
    }, [debouncedValues]);

    useEffect(() => {
        if (category !== product.category) {
            applyUpdate();
        }
    }, [category]);

    const deleteProduct = () => {
        deleteProductFromList(listId, [{ _id: product._id }]);
        onHide();
    };

    return ReactDOM.createPortal(
        <Modal
            show={show}
            onHide={() => {
                onHide();
                if (price === '') setPrice(product.price);
                if (count === '') setCount(product.count);
                if (name === '') setCount(product.name);
            }}
            className='w-100'
            centered
        >
            <Modal.Header className='d-flex justify-content-center modal-styled-bg'>
                <Modal.Title className='justify-content-center title'>{t('Edit Product')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex align-items-start flex-column modal-fixed-height modal-styled-bg'>
                <Form.Group as={Col} className='mx-auto'>
                    <InputGroup className='my-2'>
                        <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                            {t('Name')}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <InputGroup.Text>
                            <MdShoppingCart />
                        </InputGroup.Text>
                    </InputGroup>
                    <InputGroup className='my-2'>
                        <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                            {t('Quantity')}
                        </Form.Label>
                        <Form.Control
                            className='text-start'
                            type="number"
                            min={1}
                            onKeyPress={event => preventCharacters(event)}
                            onChange={(e) => setCount(e.target.value)}
                            value={count}
                        />
                        <InputGroup.Text>
                            <FaPlusMinus />
                        </InputGroup.Text>
                    </InputGroup>
                    <InputGroup className='my-2'>
                        <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                            {t('Price')}
                        </Form.Label>
                        <Form.Control
                            className={'text-start'}
                            type="number"
                            inputMode="decimal"
                            min={0}
                            onKeyPress={event => preventCharacters(event)}
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                        <InputGroup.Text>
                            <span>{getCurrencySymbol(country)}</span>
                        </InputGroup.Text>
                    </InputGroup>
                    <InputGroup className='my-2'>
                        <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                            {t('Category')}
                        </Form.Label>
                        <Form.Select
                            aria-label="gender"
                            onChange={(e) => {setCategory(e.target.value)}}
                            value={category}
                        >
                            {allCategories.map((category) => (
                                <option key={category} value={category}>
                                    {t(category)}
                                </option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className='modal-styled-bg justify-content-around'>
                <Button onClick={() => deleteProduct()}>{t('Delete')}</Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    deleteProductFromList,
    updateProductsListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);
