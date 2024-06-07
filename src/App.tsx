import React, {FC, ReactElement, useEffect, useState} from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import {useDispatch, useSelector} from "react-redux";
import {getTodos} from "./actions/todos";

const App: FC = (): ReactElement => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const todos = useSelector(state => state.items.todos);
    useEffect(()=>{
        dispatch(getTodos());
    }, [])
    return <div>
        <button onClick={() => setOpenModal(!openModal)}>Add</button>
        {todos.length ?
            <TaskList list={todos}/> :
            <p>Todo list is empty!</p>}
        {openModal ? <TaskForm/> : null}
    </div>
};
export default App;
