import React, {useEffect, useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {Button, Card, ProgressBar} from "react-bootstrap";
import {IoMdCreate, IoMdTrash} from "react-icons/io";
import {connect, useSelector} from "react-redux";
import {getAllProducts, removeTodoRequest, updateListRequest} from "../../../actions/shoppingLists";
import CreateListModal from "./createListModal";
import {Link} from "react-router-dom";

const ShoppingLists = ({allProducts, lists,getAllProducts, removeTodoRequest,updateListRequest, userId}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        getAllProducts();
    },[]);
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

    return (
        <>
            <Accordion alwaysOpen={true} defaultActiveKey={0} className='w-75 p-3'>
                {lists.map(list => {
                    console.log(list.products);
                    return <div className='list-item-link'>
                        <Card>
                            <Link to={`/lists/${list._id}`}>
                                {list.name} {list._id}
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
                            </Link>

                           <div className="buttons">
                               <Button variant={buttonsVariant} className='remove' onClick={()=> removeList(list.id)}><IoMdTrash /></Button>
                               <Button variant={buttonsVariant} className='edit' onClick={()=> editList(list)}><IoMdCreate/></Button>
                           </div>

                        </Card>
                    </div>
                })}
            </Accordion>
            <CreateListModal
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
