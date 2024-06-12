import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";

const TaskForm = ({show, onHide, onApply}) => {
    return ReactDOM.createPortal(<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={onApply}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>, document.body);
};

export default TaskForm;
