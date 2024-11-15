import React from 'react';
import ReactDOM from "react-dom";
import {Button, Modal} from "react-bootstrap";

const SortingModal = ({isVisible, onClose, onApply, sortingType}) => {
    return (ReactDOM.createPortal(<Modal show={isVisible} onHide={onClose} centered>
            <Modal.Header closeButton className='d-flex justify-content-center modal-styled-bg'>
                <Modal.Title className='justify-content-center title'>Sorting List</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center modal-styled-bg'>
                <Button className={`sort-btn my-1 ${sortingType === 'alphabetical' ? 'active' : ''}`} onClick={() => onApply('alphabetical')}>Alphabetical</Button>
                <Button className={`sort-btn my-1 ${sortingType === 'popularity' ? 'active' : ''}`} onClick={() => onApply('popularity')}>Popularity</Button>
                <Button className={`sort-btn my-1 ${sortingType === 'price' ? 'active' : ''}`} onClick={() => onApply('price')}>By Price</Button>
                <Button className={`sort-btn my-1 ${sortingType === 'default' ? 'active' : ''}`} onClick={() => onApply('default')}>Date added</Button>
            </Modal.Body>
        <Modal.Footer className='empty-footer  modal-styled-bg'/>
        </Modal>, document.body));
};

export default SortingModal;