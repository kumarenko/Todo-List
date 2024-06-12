import React, {FC, ReactElement, useEffect, useState} from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {connect} from "react-redux";
import { getTodos, addTodoRequest, removeTodoRequest } from './actions/todos';

const App: FC = ({ todos, getTodos, addTodoRequest, removeTodoRequest }): ReactElement => {
    const [openModal, setOpenModal] = useState(false);
    const [input, setInput] = useState('');

    useEffect(()=>{
        getTodos();
    }, []);

    const handleAddTodo = () => {
        if (input.trim()) {
            addTodoRequest(input, todos.length+1);
            setInput('');
        }
    };
    console.log(getTodos);
    return <div>
        <button onClick={() => {}}>
            Update
        </button>
        <button onClick={() => removeTodoRequest(1)}>
            Delete
        </button>
        <button onClick={() => {
            handleAddTodo();
            setOpenModal(!openModal)
        }}>Add</button>
        {todos.length ?
            <TaskList list={todos}/> :
            <p>Todo list is empty!</p>}
        {openModal ? <TaskForm/> : null}
    </div>
};

const mapStateToProps = (state) => ({
    todos: state.items.todos
});

const mapDispatchToProps = {
    addTodoRequest,
    removeTodoRequest,
    getTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

