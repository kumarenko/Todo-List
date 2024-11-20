import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import {t} from "i18next";

const FilterModal = ({isVisible, onClose, onSelectCategory, categories, filteredCats = []}) => {
    const [selected, setSelected] = useState([]);
    const [all, setAll] = useState([]);

    useEffect(() => {
        setSelected([]);
    }, []);
    useEffect(() => {
        setAll(categories);
    }, [categories]);

    useEffect(() => {
        setSelected(filteredCats);
    }, [filteredCats]);

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
        <Modal show={isVisible} onHide={onClose}>
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
                    className="mx-2"
                    onClick={() => {
                        setSelected([]);
                        onSelectCategory([]);
                        onClose();
                    }}
                >
                    {t('Reset')}
                </Button>
                <Button className="mx-2" onClick={onClose}>
                    {t('Close')}
                </Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export default FilterModal;