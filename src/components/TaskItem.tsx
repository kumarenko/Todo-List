import React from 'react';

const TaskItem = ({item}) => {
    const {id, title, status, body} = item;
    return (
        <div key={id}>
            <input type="radio" id='status' defaultChecked={status === 'DONE' }/>
            <label htmlFor="status">{title}</label>
            <p>Description: {body}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
};

export default TaskItem;
