import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Form, InputGroup, Col, ButtonGroup } from 'react-bootstrap';
import { debounce, getCurrencySymbol, onlyUnique, preventCharacters } from '../../../../helpers/helper';
import {connect, useSelector} from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { t } from 'i18next';
import {deleteProductFromList, updateProductsListRequest} from "../../../../actions/products";

import allProducts from '../../../../configs/products.json';
import currencies from "../../../../configs/currencies.json";
const allCategories = allProducts.map(prod => prod.category).filter(onlyUnique);
const customProductsUnits = ['pc(s)', 'g', 'kg', 'oz', 'lb', 'ml', 'l', 'gal'];

const EditProductModal = ({ product, show, onHide, deleteProductFromList, updateProductsListRequest, list }) => {
    const [name, setName] = useState(t(product.name));
    const [count, setCount] = useState('1');
    const [price, setPrice] = useState('0');
    const [availableUnits, setAvailableUnits] = useState([]);
    const [selectedUnits, setSelectedUnits] = useState('');
    const [category, setCategory] = useState('OTHER');
    const country = useSelector(state => state.user.user.country);
    const [debouncedValues, setDebouncedValues] = useState({ name, count, price });

    useEffect(() => {
        if (Object.keys(product).length) {
            setName(t(product.name));
            setCount(product?.count ? parseFloat(product.count) : '1');
            setPrice(product?.price ? product.price : 0);
            setCategory(product?.category || 'OTHER');
            setAvailableUnits(product.availableUnits || []);
            setSelectedUnits(product.selectedUnits ? product.selectedUnits : 'pc(s)');
        }
    }, [product, show]);

    const applyUpdate = (updatedProduct = null) => {
        const prod = updatedProduct || {
            _id: product._id,
            checked: product.checked,
            name,
            count: parseFloat(count || '0'),
            price: parseFloat(price || '0'),
            selectedUnits,
            availableUnits,
            category,
            avatar: product.avatar,
        };

        if (prod.price.toString() && prod.name && prod.count.toString() && parseFloat(prod.count) !== 0) {
            updateProductsListRequest(list._id, [prod]);
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
            if (product.name !== debouncedValues.name || product.count !== debouncedValues.count || product.price !== debouncedValues.price) {
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
        deleteProductFromList(list._id, [{ _id: product._id }]);
        onHide();
    };

    const handlePaste = (event) => {
        let pastedText = event.clipboardData.getData('Text');
        pastedText = pastedText.replace(/[^0-9.]/g, '');
        event.preventDefault();
        document.execCommand('insertText', false, pastedText);
    };

    const handleInput = (event, setValue) => {
        let inputValue = event.target.value;

        inputValue = inputValue.replace(/[^0-9.]/g, '');

        const parts = inputValue.split('.');

        if (parts.length > 2) {
            inputValue = parts[0] + '.' + parts[1];
        }

        if (inputValue.startsWith('.')) {
            inputValue = '0' + inputValue;
        }

        if (/^0{2,}/.test(parts[0])) {
            parts[0] = parts[0].replace(/^0+/, '0');
        }

        if (parts[0].length > 6) {
            parts[0] = parts[0].slice(0, 6);
        }

        if (parts[1]?.length > 2) {
            parts[1] = parts[1].slice(0, 2);
        }

        inputValue = parts[0] + (parts[1] !== undefined ? '.' + parts[1] : '');
        setValue(inputValue);
    };

    const changeUnits = (unit) => {
        setSelectedUnits(unit);
        applyUpdate({
            ...product,
            selectedUnits: unit,
            availableUnits: [...availableUnits],
        });
    };

    return ReactDOM.createPortal(
        <Modal
            show={show}
            onHide={onHide}
            className='w-100'
            centered
        >
            <Modal.Header closeButton className='d-flex justify-content-center modal-styled-bg'>
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
                            maxLength={100}
                            value={name}
                        />
                        <InputGroup.Text className='pe-none'>
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
                            inputMode="decimal"
                            min={0}
                            onPaste={handlePaste}
                            onInput={(e) => handleInput(e, setCount)}
                            onKeyPress={event => preventCharacters(event)}
                            value={count}
                        />
                        <InputGroup.Text className='pe-none d-block p-1' style={{width: 42}}>
                            {t(selectedUnits)}
                        </InputGroup.Text>
                    </InputGroup>
                    {availableUnits?.length ? (
                            <InputGroup className='flex-nowrap'>
                                <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                                    {t('Units')}
                                </Form.Label>
                                {allProducts.find(prod => prod.name === product.name) ? <ButtonGroup>
                                    {allProducts.find(prod => prod.name === product.name).units.map( unit => <Button
                                        className={`${unit === selectedUnits ? 'active' : ''}`}
                                        key={unit}
                                        onClick={() => changeUnits(unit)}
                                    >
                                        {t(unit)}
                                    </Button>)}
                                </ButtonGroup> : <ButtonGroup className='w-100'>
                                    {customProductsUnits.map(unit => <Button
                                        className={`${unit === selectedUnits ? 'active' : ''} px-1`}
                                        key={unit}
                                        onClick={() => changeUnits(unit)}
                                    >
                                        {t(unit)}
                                    </Button>)}
                                </ButtonGroup>
                                }
                            </InputGroup>
                    ) : null}
                    <InputGroup className='my-2'>
                        <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                            {t('Price')}
                        </Form.Label>
                        <Form.Control
                            className={'text-start'}
                            type="number"
                            inputMode="decimal"
                            min={0}
                            onPaste={handlePaste}
                            onKeyPress={event => preventCharacters(event)}
                            onInput={(e) => handleInput(e, setPrice)}
                            value={price}
                        />
                        <InputGroup.Text className='pe-none'>
                            <span style={{width: 16}}> {currencies.find(curr => curr.code === list.currency)?.symbol || getCurrencySymbol(country)}</span>
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

const mapStateToProps = (state) => ({
    list: state.items.list,
});

const mapDispatchToProps = {
    deleteProductFromList,
    updateProductsListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);
