import {setTodos} from "../redux/reducer";
import axios from "axios";
const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';
export const getTodos:unknown = () => {
    return async (dispatch) => {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`);
        dispatch(setTodos(response.data))
    }
}

const updateTodoRequest = () => ({ type: UPDATE_TODO_REQUEST });
const updateTodoSuccess = (id, updatedTodo) => ({ type: UPDATE_TODO_SUCCESS, payload: { id, updatedTodo } });
const updateTodoFailure = (error) => ({ type: UPDATE_TODO_FAILURE, payload: error });

export const updateTodo = (id:number, updatedTodo:string) => {
    return (dispatch) => {
        dispatch(updateTodoRequest());
        return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch(updateTodoSuccess(id, data));
            })
            .catch(error => {
                dispatch(updateTodoFailure(error.toString()));
            });
    };
};
