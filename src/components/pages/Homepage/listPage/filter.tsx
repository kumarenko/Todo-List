import React, { useEffect, useState } from 'react';
import {Button, ButtonGroup, Dropdown, Form} from "react-bootstrap";
import { useSelector } from "react-redux";
import { ProductCategories } from "../../../../types/types";
import {MdFilterListAlt} from "react-icons/md";

export const Filter = ({filterData}) => {
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
        filterData(selected);
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

    useEffect(() => {
        filterData(selected);
    }, [selected]);

    return (
        <Dropdown as={ButtonGroup} className='me-1'>
            <Dropdown.Toggle variant={buttonsVariant} className='dropdown-without-arrow'>
                Filter <MdFilterListAlt />
            </Dropdown.Toggle>
            <Dropdown.Menu variant={buttonsVariant}>
                <Dropdown.Item
                    as="div"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div onClick={() => onSelectAll()}>
                        <Form.Check
                            type="checkbox"
                            label='Check all'
                            checked={all.length === selected.length}
                            onChange={() => {}}
                        />
                    </div>
                </Dropdown.Item>
                <div className='d-flex'>
                    <Button onClick={() => onSelectAll()}>
                        Check all
                    </Button>
                    <Button onClick={() => setSelected([])}>
                        Uncheck all
                    </Button>
                </div>
                {all.map(category => (
                    <Dropdown.Item
                        key={category}
                        as="div"
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
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};
