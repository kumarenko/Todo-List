import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import {t} from "i18next";

const DeleteListModal = ({name, show, onHide, onApply}) => {
    return ReactDOM.createPortal(<Modal show={show} onHide={onHide} centered>
        <Modal.Header className='modal-styled-bg justify-content-center text-break'>
            <Modal.Title className='title'>{t('Are you sure to delete list')} <strong>{name}</strong>?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className='modal-styled-bg justify-content-center'>
            <Button onClick={onHide} className='mx-2'>
                {t('No')}
            </Button>
            <Button onClick={onApply} className='mx-2'>
                {t('Yes')}
            </Button>
        </Modal.Footer>
    </Modal>, document.body);
};

export default DeleteListModal;
