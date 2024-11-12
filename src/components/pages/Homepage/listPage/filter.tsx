import React, { useEffect, useState } from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { ProductCategories } from "../../../../types/types";

export const Filter = ({show, filterData, onHide}) => {
    const [selected, setSelected] = useState([]);
    const [all, setAll] = useState([]);

    const onSelect = (item) => {
        setSelected(prevSelected => {
            const newSelected = [...prevSelected];
            newSelected.includes(item) ?
                newSelected.splice(newSelected.indexOf(item), 1) :
                newSelected.push(item);
            return newSelected;
        });
    };

    const onSelectAll = () => {
        selected.length === all.length ?
            setSelected([]) :
            setSelected([...ProductCategories]);
    };

    useEffect(() => {
        setSelected([...ProductCategories]);
        setAll([...ProductCategories]);
    }, []);

    return (<Modal  show={show} onHide={onHide}  className='w-100' centered>
        <Modal.Header className='dropdown-without-arrow modal-styled-bg d-flex justify-content-center'>
            <Modal.Title>Filter Products by categories</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-fixed-height modal-styled-bg'>
            <div className='d-flex justify-content-around'>
                <Button onClick={() => onSelectAll()}>
                    Check all
                </Button>
                <Button onClick={() => setSelected([])}>
                    Uncheck all
                </Button>
            </div>
            <ul className='list-unstyled'>
                {all.map(category => (
                    <li
                        key={category}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='d-flex' onClick={() => onSelect(category)}>
                            <Form.Check
                                name={category}
                                type="checkbox"
                                checked={selected.includes(category)}
                                onChange={() => {}}
                            />
                            <Form.Label className='subtitle ms-2' htmlFor={category}>
                                {category}
                            </Form.Label>
                        </div>
                    </li>
                ))}
            </ul>
        </Modal.Body>
        <Modal.Footer className='modal-styled-bg justify-content-around'>
            <Button onClick={() => {
                filterData(selected);
                onHide();
            }}>Apply</Button>
            <Button onClick={onHide}>Cancel</Button>
        </Modal.Footer>
    </Modal>);
};
