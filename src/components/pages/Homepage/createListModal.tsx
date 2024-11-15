import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const CreateListModal = ({value = null, show, onHide, onApply}) => {
    const [data, setData] = useState("");
    function handleClick() {
        onApply(data || value?.name.value);
        setData('');
    }
    const onCloseHandler = () => {
        onHide();
        setData('');
    }
    return ReactDOM.createPortal(<Modal show={show} onHide={onCloseHandler} centered>
        <Modal.Header className='modal-styled-bg justify-content-center'>
            <Modal.Title className='title'>{value ? 'Renaming list' : 'Adding new List'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-styled-bg'>
            <Form.Label htmlFor="name" className='subtitle'>Enter name: </Form.Label>
            <Form.Control
                type="text"
                id="name"
                defaultValue={value?.name.value || ''}
                onChange={(e)=> setData(e.target.value)}
            />
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg justify-content-around'>
            <Button onClick={onHide}>
                Cancel
            </Button>
            <Button onClick={handleClick} disabled={data.length === 0}>
                Apply
            </Button>
        </Modal.Footer>
    </Modal>, document.body);
};

export default CreateListModal;
