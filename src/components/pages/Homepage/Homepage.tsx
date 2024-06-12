import React, {FC, ReactElement, useEffect, useState} from "react";
import TaskForm from "./TaskForm";
import {connect} from "react-redux";
import { getTodos, addTodoRequest, removeTodoRequest,getShoppingLists } from '../../../actions/todos';
import ShoppingLists from "./shoppingLists";
import {Button} from "react-bootstrap";
import {IoMdAdd} from "react-icons/io";

const HomePage: FC = ({ todos, lists, getTodos, addTodoRequest, removeTodoRequest,getShoppingLists }): ReactElement => {
    const [input, setInput] = useState('');
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleApply = () => {
        addTodoRequest();
        setShowModal(false);

    };
    const handleShow = () => setShowModal(true);
    useEffect(()=>{
        getTodos();
        getShoppingLists();
    }, []);

    console.log('lists',lists);
    return <div className='d-flex flex-column align-items-center'>
        <div className="d-flex justify-content-between h3 w-75 p-3">
            <h1>My shopping lists</h1>
            <Button onClick={()=> handleShow()}><IoMdAdd size={16}/> Add new List</Button>
        </div>
        {lists.length ? <ShoppingLists lists={lists}/> :
            <h3>Here is no List. Press 'Add List' to create new one!</h3>}
            <TaskForm
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
    </div>
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        todos: state.items.todos,
        lists: state.items.lists
    }
};

const mapDispatchToProps = {
    addTodoRequest,
    removeTodoRequest,
    getTodos,
    getShoppingLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

