import React from 'react';
import TaskItem from "./TaskItem";

const TaskList = ({list}) => {
    return (list.map(item => <TaskItem item={item}/>)
    );
};

export default TaskList;
