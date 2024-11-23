import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal} from "react-bootstrap";
import {t} from "i18next";
import {copyTextToClipboard} from "../../../helpers/helper";
import {useState} from "react";
import CustomAlert from "../../../common/Alert";
import {defaultListsState} from "../../../redux/shoppingListsReducer";

const CopyListModal = ({list, show, onHide}) => {
    const [message, setMessage] = useState('');

    const [l, setL] = useState(defaultListsState.list);

    function compareFn(a, b) {
        if (a.checked < b.checked) {
            return -1;
        } else if (a.checked > b.checked) {
            return 1;
        }
        return 0;
    }
    useEffect(() => {
        setL({
            ...list,
            products: list.products.map(product => ({ ...product })),
        });
    }, [list]);

    const copyAllList = () => {
        let str = `${l.name.value}\n`;
        l.products.sort(compareFn).forEach(prod => {
            const prodStr = `${t(prod.name)}${parseInt(prod.count) > 1 ?`: ${parseInt(prod.count)} ${t('pcs')}` : ''}`
            if(prod.checked) {
                str = str + `• ${prodStr.split('').map(char => char + '\u0336').join('')}\n`
            } else {
                str = str + `• ${prodStr}\n`
            }
        });
        copyTextToClipboard(str)
            .then(result => {
                if (result === 'success') {
                    setMessage(t('List copied to clipboard'));
                }
            })
            .catch(error => {
                setMessage(`${t('Error copying to clipboard')}: ${error}`);
            });
        setTimeout(() => setMessage(''), 2500);
    }
    const copyChecked = (checked) => {
        let str = `${list.name.value}\n${t(checked ? 'Purchased' : 'Remaining')}:\n`;
        l.products.sort(compareFn).forEach(prod => {
            const prodStr = `${t(prod.name)}${parseInt(prod.count) > 1 ?`: ${parseInt(prod.count)} ${t('pcs')}` : ''}`
            if(prod.checked === checked) {
                str = str + `• ${prodStr}\n`
            }
        });
        copyTextToClipboard(str)
            .then(result => {
                if (result === 'success') {
                    checked ?
                        setMessage(t('Purchased products copied to clipboard')) :
                        setMessage(t('No purchased products copied to clipboard'));
                }
            })
            .catch(error => {
                setMessage(`${t('Error copying to clipboard')}: ${error}`);
            });
        setTimeout(() => setMessage(''), 2500);
    }
    return (ReactDOM.createPortal(<Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton className='d-flex justify-content-center modal-styled-bg'>
            <Modal.Title className='justify-content-center title'>{t('Copy List to clipboard')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column align-items-center modal-styled-bg'>
            <Button className={`sort-btn my-1`} onClick={() => copyAllList()}>{t('Copy all list')}</Button>
            <Button className={`sort-btn my-1`} onClick={() => copyChecked(false)}>{t('Copy checked products')}</Button>
            <Button className={`sort-btn my-1`} onClick={() => copyChecked(true)}>{t('Copy unchecked products')}</Button>
        </Modal.Body>
        <Modal.Footer className='empty-footer  modal-styled-bg'/>
        {message ? <CustomAlert className='popup'>
            {message}
        </CustomAlert> : null}
    </Modal>, document.body));
};

export default CopyListModal;