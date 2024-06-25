import {
    addProductsToList,
    deleteList,
    setAllProducts,
    updateList,
    updateProductsList
} from "../redux/shoppingListsReducer";
import {setShoppingLists} from "../redux/shoppingListsReducer";
import axios from "axios";
import {PRODUCTS_URL, SHOPPING_LISTS_URL} from "../configs/urls";

export const getShoppingLists = () => {
    return async (dispatch) => {
        const response = await axios.get(
            SHOPPING_LISTS_URL);
        dispatch(setShoppingLists(response.data.shoppingLists))
    }
}
export const getAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get(PRODUCTS_URL);
        dispatch(setAllProducts(response.data.products));
    }
}

export const addProducts = ({_id, name, added, count}, increment) => {
    return async (dispatch) => {
        const newObj = {
            id: _id,
            name: name,
            added: true,
            count: (count ?? 0)+increment
        }
        const response = await fetch(
            PRODUCTS_URL,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObj)
            }).then(res=>res.json());
        dispatch(addProductsToList(response.product));
    }
}

export const updateListRequest = (list, newValue) => {
    return async (dispatch) => {
        const newObject = {
            ...list,
            name: newValue
        }
        dispatch(updateList(newObject));
    };
};
export const updateProductsListRequest = (name, parentId, id, added, details) => {
    return async (dispatch) => {
        const objectToUpdate = {
            id: parentId,
            items: [{id: id, name, added, details}
            ]
        }
        dispatch(updateProductsList(objectToUpdate));
    };
};
export const addProductToListRequest = (name, parentId, id, added, details, count) => {
    return async (dispatch) => {
        const response = await fetch(
            PRODUCTS_URL,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, name, added, count})
            }).then(res=>res.json());
        dispatch(addProductsToList(response.product));
    }
};


export const removeTodoRequest = (id) => {
    return (dispatch) => {
        dispatch(deleteList(id));

    };
};


