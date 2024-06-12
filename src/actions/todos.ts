import {addListSuccess, setTodos} from "../redux/reducer";
import {setShoppingLists} from "../redux/reducer";
import axios from "axios";
import {tempShoppingList} from "../components/tempList";

export const getTodos:unknown = () => {
    return async (dispatch) => {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos`);
        dispatch(setTodos(response.data))
    }
}

export const getShoppingLists:unknown = () => {
    return (dispatch) => {
        dispatch(setShoppingLists(tempShoppingList))
    }
}

export const addTodoRequest = () => {
    const temporaryPayload = {
        id: Math.floor(Math.random() * 10),
        name: 'New List',
        items: []
    }
    return (dispatch) => {
        try {
            dispatch(addListSuccess(temporaryPayload));
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };
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
