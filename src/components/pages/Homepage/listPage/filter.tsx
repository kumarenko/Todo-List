import React, { useEffect, useState } from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import { useSelector } from "react-redux";
import { ProductCategories } from "../../../../types/types";

export const Filter = ({show, filterData, onHide}) => {
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
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
        <div className='me-1'>
            <Modal.Header variant={buttonsVariant} className='dropdown-without-arrow'>
                <Modal.Title>Filter Products by categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex'>
                    <Button onClick={() => onSelectAll()}>
                        Check all
                    </Button>
                    <Button onClick={() => setSelected([])}>
                        Uncheck all
                    </Button>
                </div>
                <ul>
                    {all.map(category => (
                        <li
                            key={category}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div onClick={() => onSelect(category)}>
                                <Form.Check
                                    type="checkbox"
                                    label={category}
                                    checked={selected.includes(category)}
                                    onChange={() => {}}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    filterData(selected);
                    onHide();
                }}>Apply</Button>
                <Button onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </div>
    </Modal>);
};
