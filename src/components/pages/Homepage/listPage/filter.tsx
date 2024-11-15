import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal} from "react-bootstrap";
import allProducts from "../../../../configs/products.json";
import {onlyUnique} from "../../../../helpers/helper";

const categories = allProducts.map(prod => prod.category).filter(onlyUnique);

const FilterModal = ({isVisible, onClose, onSelectCategory}) => {
    const [selected, setSelected] = useState([]);
    const [all, setAll] = useState([]);
    useEffect(() => {
        setSelected([]);
        setAll([...categories]);
    }, []);

    const setSelectedCategory = item => {
        setSelected(prevSelected => {
            const newSelected = [...prevSelected];
            newSelected.includes(item)
                ? newSelected.splice(newSelected.indexOf(item), 1)
                : newSelected.push(item);
            return newSelected;
        });
    };
    return ReactDOM.createPortal(<Modal show={isVisible} onHide={onClose}>
        <Modal.Header>
            Filter Products by categories
        </Modal.Header>
        <Modal.Body>
            {all.map((item, index) => (
                <Button
                    key={index}
                    onClick={() => setSelectedCategory(item)}>
                    <span>
                        {item}
                    </span>
                </Button>
            ))}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => {
                setSelected([]);
            }}>Reset</Button>
            <Button onClick={() => {
                onSelectCategory(selected);
                onClose();
            }}>Apply</Button>
            <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
    </Modal>, document.body);
};

export default FilterModal;