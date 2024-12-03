import React from 'react';
import ReactDOM from "react-dom";
import {Button, Modal} from "react-bootstrap";
import {t} from "i18next";
import Settings from "../Settings/settings";
import {IoMdClose} from "react-icons/io";

const SettingsModal = ({show, onHide}) => {
    return (ReactDOM.createPortal(<Modal show={show} onHide={onHide} centered>
        <Modal.Header className='d-flex justify-content-center modal-styled-bg'>
            <Modal.Title className='justify-content-center title'>{t('Settings')}</Modal.Title>
            <Button type="button" className="btn custom-close" aria-label="Close" onClick={onHide}>
                <IoMdClose size={20}/>
            </Button>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column align-items-center modal-styled-bg'>
            <Settings isLoginPage={true}/>
        </Modal.Body>
        <Modal.Footer className='empty-footer modal-styled-bg'/>
    </Modal>, document.body));
};

export default SettingsModal;