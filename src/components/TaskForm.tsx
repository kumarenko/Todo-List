import React from 'react';
import ReactDOM from 'react-dom';

const TaskForm = () => {
    return ReactDOM.createPortal(<div>
        <h3>Add new Todo</h3>
        <label htmlFor="todo-name">Name</label>
        <input type="text" id='todo-name'/>
        <label htmlFor="todo-description">Description</label>
        <textarea id="todo-description"/>
    </div>, document.body);
};

export default TaskForm;
