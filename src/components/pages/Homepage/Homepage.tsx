import React, {FC, ReactElement, useEffect, useState} from "react";
import TaskList from "./../../../components/TaskList";
import TaskForm from "./../../../components/TaskForm";
import {connect} from "react-redux";
import { getTodos, addTodoRequest, removeTodoRequest,getShoppingLists } from '../../../actions/todos';
import ShoppingLists from "./shoppingLists";
import {Button} from "react-bootstrap";

const HomePage: FC = ({ todos, lists, getTodos, addTodoRequest, removeTodoRequest,getShoppingLists }): ReactElement => {
    const [openModal, setOpenModal] = useState(false);
    const [input, setInput] = useState('');

    useEffect(()=>{
        getTodos();
        getShoppingLists();
    }, []);

    const handleAddTodo = () => {
        if (input.trim()) {
            addTodoRequest(input, todos.length+1);
            setInput('');
        }
    };
    console.log('lists',lists);
    return <div className='d-flex flex-column align-items-center'>
        <div className="d-flex justify-content-between h3 w-75 p-3">
            <h1>My shopping lists</h1>
            <Button>Add new List</Button>
        </div>
        {lists.length ? <ShoppingLists lists={lists}/> :
            <h3>Here is no List. Press 'Add List' to create new one!</h3>}


        {/*<button onClick={() => removeTodoRequest(1)}>
            Delete
        </button>
        <button onClick={() => {
            handleAddTodo();
            setOpenModal(!openModal)
        }}>Add</button>*/}


        {/*{todos.length ?*/}
        {/*    <TaskList list={todos}/> :*/}
        {/*    <p>Todo list is empty!</p>}*/}
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

