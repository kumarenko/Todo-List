import React, {useEffect, useState} from 'react';
import ProductsList from "./productsList";
import Accordion from 'react-bootstrap/Accordion';
import {Button} from "react-bootstrap";
import {IoMdCreate, IoMdTrash} from "react-icons/io";
import {connect} from "react-redux";
import {getAllProducts, removeTodoRequest, updateListRequest} from "../../../actions/todos";
import TaskForm from "./TaskForm";

const ShoppingLists = ({allProducts, lists,getAllProducts, removeTodoRequest,updateListRequest}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        getAllProducts();
        console.log('flterred',allProducts, filterAllProducts());

    },[]);
    useEffect(()=> {
        filterAllProducts()
    }, [allProducts]);
    const handleClose = () => {
        setSelectedList(null);
        setShowModal(false);
    };
    const handleApply = (text) => {
        updateListRequest(selectedList, text);
        setShowModal(false);

    };
    const removeList = (id) => {
        removeTodoRequest(id);
    }
    const editList = (list) => {
        setSelectedList(list);
        setShowModal(true);
    }
    const filterAllProducts = () => setFilteredProducts(allProducts.filter(product => product.count > 0));
    return (
        <>
            <Accordion alwaysOpen={true} defaultActiveKey={0} className='w-75 p-3'>
                {lists.map(list => {
                    return <Accordion.Item className='accordion' eventKey={list.id} key={list.id}>
                        <Button className='remove' onClick={()=> removeList(list.id)}><IoMdTrash /></Button>
                        <Button className='edit' onClick={()=> editList(list)}><IoMdCreate/></Button>
                        <Accordion.Header className='d-flex justify-content-between'>
                            {list.name}
                            {list.items.length ? <span> 0/{list.items.length}</span> : null}
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="accordion-body">
                                <ProductsList parentId={list.id} products={filteredProducts}/>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                },)}
            </Accordion>
            <TaskForm
                value={selectedList}
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
        </>
    );
};
const mapStateToProps = (state) => ({
    todos: state.items.todos,
    lists: state.items.lists,
    allProducts: state.items.allProducts
});
const mapDispatchToProps = {
    removeTodoRequest,
    updateListRequest,
    getAllProducts
};

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingLists)
