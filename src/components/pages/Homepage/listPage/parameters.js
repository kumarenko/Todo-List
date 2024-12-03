import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Col, Form, InputGroup, Modal} from "react-bootstrap";
import {t} from "i18next";
import {IoMdClose, IoMdRemoveCircle} from "react-icons/io";
import {ImCheckboxUnchecked} from "react-icons/im";
import currencies from './../../../../configs/currencies.json';
import {useDispatch} from "react-redux";
import {updateListCurrencyRequest} from "../../../../actions/shoppingLists";
import {deleteProductFromList, updateProductsListRequest} from "../../../../actions/products";

const ParametersListModal = ({show, onHide, list, defaultCurrency}) => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState('')
    useEffect(() => {
        setCurrency(list.currency || defaultCurrency);
    }, [list.currency]);
    const changeCurrency = value => {
        setCurrency(value);
        dispatch(updateListCurrencyRequest(list, value));
    }

    const uncheckProducts = (products) => {
        const prodsToUpdate = products.map(prod => ({...prod, checked: false}));
        dispatch(updateProductsListRequest(list._id, prodsToUpdate));
    }
    const deleteCheckedProducts = (products) => {
        const prodsToUpdate = products.map(prod => ({...prod, checked: false}));
        dispatch(deleteProductFromList(list._id, prodsToUpdate));
    }
    return ReactDOM.createPortal(
        <Modal show={show} onHide={onHide} centered className='px-2'>
            <Modal.Header className="d-flex justify-content-center modal-styled-bg">
                <Modal.Title className="justify-content-center title">Parameters</Modal.Title>
                <Button type="button" className="btn custom-close" aria-label="Close" onClick={onHide}>
                    <IoMdClose size={20}/>
                </Button>
            </Modal.Header>
            <Modal.Body className="modal-styled-bg">
                <Form.Group as={Col} className='mx-auto mb-3'>
                    <InputGroup className='my-2'>
                        <Form.Label column sm="2" className='subtitle mx-2 w-25'>
                            {t('Currency')}
                        </Form.Label>
                        <Form.Select
                            aria-label="currency"
                            onChange={(e) => changeCurrency(e.target.value)}
                            value={currency}
                        >
                            {currencies.map(currency => <option key={currency.code} value={currency.code}>
                                {currency.code} ({currency.symbol})
                            </option>)}
                        </Form.Select>
                    </InputGroup>
                </Form.Group>
                <Button className="d-flex align-items-center mx-2 mb-3"
                        disabled={list.products.filter(prod => prod.checked).length === 0}
                         onClick={() => uncheckProducts(list.products.filter(prod => prod.checked))}>
                    <ImCheckboxUnchecked className='me-2' />
                    {t('Uncheck all products')} {list.products.filter(prod => prod.checked).length ? `(${list.products.filter(prod => prod.checked).length})` : ''}
                </Button>
                <Button className="d-flex align-items-center mx-2 mb-1"
                        disabled={list.products.filter(prod => prod.checked).length === 0}
                        onClick={() => deleteCheckedProducts(list.products.filter(prod => prod.checked))}>
                    <IoMdRemoveCircle className='me-2' />
                    {t('Delete checked products')} {list.products.filter(prod => prod.checked).length ? `(${list.products.filter(prod => prod.checked).length})` : ''}
                </Button>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center modal-styled-bg">
                <Button className="d-flex align-items-center mx-2" onClick={onHide}>
                    {t('Close')}
                </Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export default ParametersListModal;