import React from 'react';

const TaskItem = ({item}) => {
    const {id, title, completed} = item;
    return (
        <div key={id}>
            <input type="radio" id='status' defaultChecked={completed }/>
            <label htmlFor="status">{title}</label>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
};

export default TaskItem;
