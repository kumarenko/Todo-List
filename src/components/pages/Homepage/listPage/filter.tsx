import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import {t} from "i18next";
import {IoMdClose} from "react-icons/io";
import { RiFilterOffFill } from "react-icons/ri";

const FilterModal = ({isVisible, onClose, onSelectCategory, categories, filteredCats = []}) => {
    const [selected, setSelected] = useState([]);
    const [all, setAll] = useState([]);

    useEffect(() => {
        setSelected(filteredCats);
    }, []);
    useEffect(() => {
        setAll(categories);
    }, [categories]);

    const setSelectedCategory = (item) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];
            if (newSelected.includes(item)) {
                newSelected.splice(newSelected.indexOf(item), 1);
            } else {
                newSelected.push(item);
            }
            onSelectCategory(newSelected);
            return newSelected;
        });
    };

    return ReactDOM.createPortal(
        <Modal show={isVisible} onHide={onClose} centered className='px-2' style={{transform: 'scale(0.95)'}}>
            <Modal.Header closeButton className="d-flex justify-content-center modal-styled-bg">
                <Modal.Title className="justify-content-center title">{t('Filter Products by categories')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-styled-bg">
                {all.map((item, index) => (
                    <Button
                        className={`m-1 ${selected.includes(item) ? 'active' : ''}`}
                        key={index}
                        onClick={() => setSelectedCategory(item)}
                    >
                        <span>{t(item)}</span>
                    </Button>
                ))}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center modal-styled-bg">
                <Button
                    className="d-flex align-items-center mx-2"
                    onClick={() => {
                        setSelected([]);
                        onSelectCategory([]);
                        onClose();
                    }}
                >
                    <RiFilterOffFill className='me-2'/>
                    {t('Reset')}
                </Button>
                <Button className="d-flex align-items-center mx-2" onClick={onClose}>
                    <IoMdClose className='me-2'/>
                    {t('Close')}
                </Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export default FilterModal;