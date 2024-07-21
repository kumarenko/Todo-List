import React, {useEffect, useState} from 'react';
import ProductsList from "./productsList";
import Accordion from 'react-bootstrap/Accordion';
import {Button, Card, ProgressBar} from "react-bootstrap";
import {IoMdCreate, IoMdTrash} from "react-icons/io";
import {connect, useSelector} from "react-redux";
import {getAllProducts, removeTodoRequest, updateListRequest} from "../../../actions/shoppingLists";
import TaskForm from "./TaskForm";
import {Link} from "react-router-dom";

const ShoppingLists = ({allProducts, lists,getAllProducts, removeTodoRequest,updateListRequest, userId}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        getAllProducts();
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
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';
    const filterAllProducts = () => setFilteredProducts(allProducts.filter(product => product.count > 0));
    return (
        <>
            <Accordion alwaysOpen={true} defaultActiveKey={0} className='w-75 p-3'>
                {lists.map(list => {
                    console.log(list.products);
                    return <Link className='list-item-link' to={`/lists/${list._id}`}>
                        <Card>
                            <span>{list.name} {list._id}</span>
                             {list.products.length ?
                                 <>
                                     {list.products.filter(item => item).length} / {list.products.length}
                                     <ProgressBar
                                         className='w-50 mt-1 z-1'
                                         now={list.products.filter(item => item).length}
                                         max={list.products.length}
                                     />
                                 </>
                                 : null}

                        </Card>
                    </Link>
                })}
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
    lists: state.items.lists,
    allProducts: state.items.allProducts,
    userId: state.user.user.id,
});
const mapDispatchToProps = {
    removeTodoRequest,
    updateListRequest,
    getAllProducts
};

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingLists)
