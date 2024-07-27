import {
    addProductsToList,
    setAllProducts, setShoppingList,
    updateList,
} from "../redux/shoppingListsReducer";
import {setShoppingLists} from "../redux/shoppingListsReducer";
import axios from "axios";
import {
    PRODUCTS_URL, SHOPPING_LISTS_URL,
    SHOPPING_LIST_CREATE_URL,
    SHOPPING_LISTS_ADD_PROD_URL, SHOPPING_LISTS_EDIT_PROD_URL,
    SHOPPING_LIST_SHARE_URL
} from "../configs/urls";

export const getShoppingLists = (userId: string) => {
    return async (dispatch) => {
        const response = await axios.get(
            SHOPPING_LISTS_URL, {params: {userId}});
        dispatch(setShoppingLists(response.data.shoppingLists))
    }
}

export const getShoppingList = (listId) => {
    return async (dispatch) => {
        const response = await axios.get(
            `${SHOPPING_LISTS_URL}/${listId}` );
        dispatch(setShoppingList(response.data))
    }
}
export const addShoppingList = (userId, name) => {
    return async (dispatch) => {
        const obj = {userId,name};
        const response = await fetch(
            `${SHOPPING_LIST_CREATE_URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
         dispatch(setShoppingLists(response.shoppingLists))
    }
}

export const addProductToList = (shoppingListId, product) => {
    return async (dispatch) => {
        const obj = {shoppingListId, product};
        const response = await fetch(
            `${SHOPPING_LISTS_ADD_PROD_URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        dispatch(setShoppingList(response))
    }
}

export const deleteProductFromList = (shoppingListId, product) => {
    return async (dispatch) => {
        const obj = {shoppingListId, product};
        const response = await fetch(
            `${SHOPPING_LISTS_EDIT_PROD_URL}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        dispatch(setShoppingList(response));
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
export const updateProductsListRequest = (shoppingListId, product) => {
    return async (dispatch) => {
        const objectToUpdate = {shoppingListId, product};
        const response = await fetch(
            `${SHOPPING_LISTS_EDIT_PROD_URL}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objectToUpdate)
            }).then(res=>res.json());
        dispatch(setShoppingList(response))
    };
};

export const inviteUsersRequest = (shoppingListId, invitedUser, method) => {
    return async (dispatch) => {
        const objectToUpdate = {shoppingListId, invitedUser};
        const response = await fetch(
            `${SHOPPING_LIST_SHARE_URL}`,{
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objectToUpdate)
            }).then(res=>res.json());
        dispatch(updateList(response.updatedShoppingList))
    };
};

export const removeListRequest = (userId, shoppingListId) => {
    return async (dispatch) => {
        const obj = {userId, shoppingListId};
        const response = await fetch(
            `${SHOPPING_LIST_CREATE_URL}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        dispatch(setShoppingLists(response.shoppingLists))
    }
};


