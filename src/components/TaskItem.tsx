import React from 'react';

const TaskItem = ({item}) => {
    const {id, name, status, description} = item;
    return (
        <div key={id}>
            <input type="radio" id='status' defaultChecked={status === 'DONE' }/>
            <label htmlFor="status">{name}</label>
            <p>Description: {description}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    );
};

export default TaskItem;
