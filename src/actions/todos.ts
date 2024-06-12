import {setTodos} from "../redux/reducer";
import axios from "axios";

export const getTodos:unknown = () => {
    return async (dispatch) => {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos`);
        dispatch(setTodos(response.data))
    }
}

export const addTodoRequest = (text, userId) => {
    console.log('text', text, userId);
    return async (dispatch) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, userId })
            });
            const todo = await response.json();
            console.log('wef', todo);
            dispatch(addTodoSuccess(todo));
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };
};

export const addTodoSuccess = (todo) => {
    console.log('ewrwer', todo);
    return {
        type: 'ADD_TODO_SUCCESS',
        id: todo.id,
        text: todo.text
    }
};

export const removeTodoRequest = (id) => {
    return async (dispatch) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });
            dispatch(removeTodoSuccess(id));
        } catch (error) {
            console.error('Error removing todo:', error);
        }
    };
};

export const removeTodoSuccess = (id) => ({
    type: 'REMOVE_TODO_SUCCESS',
    id
});
