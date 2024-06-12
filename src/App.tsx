import React, {FC, ReactElement, useEffect, useState} from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {getTodos} from "./actions/todos";
import {deleteTodo} from "./redux/reducer";
import {updateTodo} from "./actions/todos";

const App: FC = (): ReactElement => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const todos = useSelector(state => state.items.todos);
    useEffect(()=>{
        dispatch(getTodos());
    }, [])
    const handleUpdate = (id, newTitle) => {
        const updatedTodo = { title: newTitle };
        //@ts-ignore
        dispatch(updateTodo(id, updatedTodo));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };
    return <div>
        <button onClick={() => handleUpdate(2, 'New Title')}>
            Update
        </button>
        <button onClick={() => handleDelete(1)}>
            Delete
        </button>
        <button onClick={() => setOpenModal(!openModal)}>Add</button>
        {todos.length ?
            <TaskList list={todos}/> :
            <p>Todo list is empty!</p>}
        {openModal ? <TaskForm/> : null}
    </div>
};
export default App;
