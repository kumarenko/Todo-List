import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {t} from "i18next";

const CreateListModal = ({value = '', show, onHide, onApply}) => {
    const [data, setData] = useState(value);
    useEffect(() => {
        setData(value);
    }, [value]);
    const handleClick = () => {
        onApply( data);
        setData('');
    }
    const onCloseHandler = () => {
        onHide();
        setData('');
    }
    return ReactDOM.createPortal(<Modal show={show} onHide={onCloseHandler} centered>
        <Modal.Header className='modal-styled-bg justify-content-center'>
            <Modal.Title className='title'>{value ? t('Rename list') : t('Add new list')}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-styled-bg'>
            <Form.Label htmlFor="name" className='subtitle'>{t('List name')}:</Form.Label>
            <Form.Control
                type="text"
                id="name"
                className='input-with-length-numbers'
                maxLength={100}
                defaultValue={data}
                onChange={(e)=> setData(e.target.value)}
            />
            <Form.Label htmlFor="name" className='label-with-length-numbers subtitle d-flex justify-content-end'>{data.length} / 100</Form.Label>
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg justify-content-center'>
            <Button onClick={onHide} className='mx-2'>
                {t('Cancel')}
            </Button>
            <Button onClick={handleClick} className='mx-2'>
                {t('Apply')}
            </Button>
        </Modal.Footer>
    </Modal>, document.body);
};

export default CreateListModal;
