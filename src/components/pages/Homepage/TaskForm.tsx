import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const TaskForm = ({value = null, show, onHide, onApply}) => {
    const [data, setData] = useState("");
    function handleClick() {
        onApply(data || value?.name);
        setData('');
    }
    const onCloseHandler = () => {
        onHide();
        setData('');
    }
    return ReactDOM.createPortal(<Modal show={show} onHide={onCloseHandler}>
        <Modal.Header closeButton>
            <Modal.Title>Adding new List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Label htmlFor="name">Enter name: </Form.Label>
            <Form.Control
                type="text"
                id="name"
                defaultValue={value?.name || ''}
                onChange={(e)=> setData(e.target.value)}
            />
            <Form.Check
                type="switch"
                defaultChecked={true}
                className='my-2'
                label="Automatically reopen when completed"
            />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClick} disabled={data.length === 0}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>, document.body);
};

export default TaskForm;
