import React, {useEffect} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal} from "react-bootstrap";
import {t} from "i18next";
import {copyTextToClipboard} from "../../../helpers/helper";
import {useState} from "react";
import {defaultListsState} from "../../../redux/shoppingListsReducer";
import {IoMdClose} from "react-icons/io";
import {addMessageToQueue} from "../../../redux/settingsReducer";
import {useDispatch} from "react-redux";

const CopyListModal = ({list, show, onHide}) => {
    const dispatch = useDispatch();
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
                    dispatch(addMessageToQueue({message: t('List copied to clipboard'), type: 'success'}));
                }
            })
            .catch(error => {
                dispatch(addMessageToQueue({message: `${t('Error copying to clipboard')}: ${error}`, type: 'error'}));
            });
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
                        dispatch(addMessageToQueue({message: t('Purchased products copied to clipboard'), type: 'success'})) :
                        dispatch(addMessageToQueue({message: t('No purchased products copied to clipboard'), type: 'success'}));
                }
            })
            .catch(error => {
                dispatch(addMessageToQueue({message: `${t('Error copying to clipboard')}: ${error}`, type: 'error'}));
            });
    }
    return (ReactDOM.createPortal(<Modal show={show} onHide={onHide} centered>
        <Modal.Header className='d-flex justify-content-center modal-styled-bg'>
            <Modal.Title className='justify-content-center title'>{t('Copy List to clipboard')}</Modal.Title>
            <Button type="button" className="btn custom-close" aria-label="Close" onClick={onHide}>
                <IoMdClose size={20}/>
            </Button>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column align-items-center modal-styled-bg'>
            <Button className={`sort-btn my-1`} onClick={() => copyAllList()}>{t('Copy all list')}</Button>
            <Button className={`sort-btn my-1`} onClick={() => copyChecked(false)}>{t('Copy checked products')}</Button>
            <Button className={`sort-btn my-1`} onClick={() => copyChecked(true)}>{t('Copy unchecked products')}</Button>
        </Modal.Body>
        <Modal.Footer className='empty-footer  modal-styled-bg'/>
    </Modal>, document.body));
};

export default CopyListModal;