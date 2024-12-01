import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Col, Form, InputGroup, Modal} from "react-bootstrap";
import {t} from "i18next";
import {IoMdClose, IoMdRemoveCircle} from "react-icons/io";
import {ImCheckboxUnchecked} from "react-icons/im";
import currencies from './../../../../configs/currencies.json';
import {useDispatch} from "react-redux";
import {updateListCurrencyRequest} from "../../../../actions/shoppingLists";

const ParametersListModal = ({show, onHide, list, defaultCurrency}) => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState('');
    useEffect(() => {
        setCurrency(list.currency || defaultCurrency);
    }, []);
    const changeCurrency = value => {
        setCurrency(value);
        dispatch(updateListCurrencyRequest(list, value));
    }

    return ReactDOM.createPortal(
        <Modal show={show} onHide={onHide} centered className='px-2'>
            <Modal.Header closeButton className="d-flex justify-content-center modal-styled-bg">
                <Modal.Title className="justify-content-center title">Parameters</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-styled-bg">
                <Form.Group as={Col} className='mx-auto'>
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
                <Button  className="d-flex align-items-center mx-2 mb-3" >
                    <ImCheckboxUnchecked className='me-2' />
                    Uncheck all products
                </Button>
                <Button className="d-flex align-items-center mx-2 mb-1" >
                    <IoMdRemoveCircle className='me-2' />
                    Delete checked products
                </Button>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center modal-styled-bg">
                <Button className="d-flex align-items-center mx-2" onClick={onHide}>
                    <IoMdClose className='me-2'/>
                    {t('Close')}
                </Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export default ParametersListModal;