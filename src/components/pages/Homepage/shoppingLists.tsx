import React from 'react';
import ProductsList from "./productsList";
import Accordion from 'react-bootstrap/Accordion';
import {Button} from "react-bootstrap";
import {IoMdTrash} from "react-icons/io";

const ShoppingLists = ({lists}) => {
    return (
        <Accordion alwaysOpen={true} defaultActiveKey={0} className='w-75 p-3'>
            {lists.map(list => {
                return <Accordion.Item eventKey={list.id} key={list.id}>
                    <Accordion.Header className='d-flex justify-content-between'>{list.name} <span> 0/{list.items.length}</span><Button><IoMdTrash /></Button></Accordion.Header>
                    <Accordion.Body>
                        <div className="accordion-body">
                            {list.items.length ? <ProductsList products={list.items}/> : null}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            },)}
        </Accordion>
    );
};

export default ShoppingLists;