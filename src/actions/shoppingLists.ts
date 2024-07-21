import {
    addProductsToList,
    deleteList,
    setAllProducts, setShoppingList,
    updateList,
    updateProductsList
} from "../redux/shoppingListsReducer";
import {setShoppingLists} from "../redux/shoppingListsReducer";
import axios from "axios";
import {
    PRODUCTS_URL,
    SHOPPING_LISTS_URL,
    SHOPPING_LIST_CREATE_URL,
    SHOPPING_LISTS_DELETE_URL,
    SHOPPING_LISTS_ADD_PROD_URL
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
        console.log('response: ', response.data);
        dispatch(setShoppingList(response.data))
    }
}
export const addShoppingList = (userId, name, products) => {
    return async (dispatch) => {
        console.log('1111', userId);
        const obj = {
            userIds: [userId],
            name: name,
            products: products,
        };
        const response = await fetch(
            `${SHOPPING_LIST_CREATE_URL}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        console.log('????', response);
        // dispatch(setShoppingLists(response.data.shoppingLists))
    }
}

export const deleteProductFromList = (shoppingListId, productId) => {
    return async (dispatch) => {
        const obj = {shoppingListId, productId};
        const response = await fetch(
            `${SHOPPING_LISTS_DELETE_URL}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        console.log('????', response[0]);
        dispatch(setShoppingList(response[0]))

        // dispatch(setShoppingLists(response.data.shoppingLists))
    }
}

export const addProductToList = (shoppingListId, name) => {
    return async (dispatch) => {
        const obj = {shoppingListId, name};
        const response = await fetch(
            `${SHOPPING_LISTS_ADD_PROD_URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        console.log('????', response);
        dispatch(setShoppingList(response))

        // dispatch(setShoppingLists(response.data.shoppingLists))
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
            items: [{id, name, added, details}]
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


