import {setShoppingList} from "../redux/shoppingListsReducer";
import {setShoppingLists} from "../redux/shoppingListsReducer";
import axios from "axios";
import {
    SHOPPING_LISTS_URL, SHOPPING_LIST_CREATE_URL,
     SHOPPING_LIST_SHARE_URL
} from "../configs/urls";

export const getShoppingLists = (userId: string) => {
    return async (dispatch) => {
        const response = await axios.get(
            SHOPPING_LISTS_URL, {params: {userId}});
        dispatch(setShoppingLists(response.data.shoppingLists))
    }
}

export const getShoppingList = (listId, userId, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${SHOPPING_LISTS_URL}/${listId}`, {params: {userId}});
            if(response.status === 200) {
                dispatch(setShoppingList(response.data))
            }
        } catch (e) {
            navigate('/');
        }
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

export const updateListRequest = (list, newValue) => {
    return async (dispatch) => {
        const newObject = {
            shoppingListId: list._id,
            name: newValue
        }
        const response = await fetch(
            `${SHOPPING_LIST_CREATE_URL}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObject)
            }).then(res=>res.json());
        dispatch(setShoppingList({...list, name: response.name}));
    };
};

export const inviteUsersRequest = (shoppingListId, userId, invitedUser, method) => {
    return async (dispatch, state) => {
        const lists = state().items.lists;
        const currentList = lists.find(list => list._id === shoppingListId);
        const objectToUpdate = {shoppingListId, invitedUser, userId};
        const response = await fetch(
            `${SHOPPING_LIST_SHARE_URL}`,{
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objectToUpdate)
            });
        if(response.ok) {
            const data = await response.json();
            dispatch(setShoppingList({...currentList, userOwners: data.userOwners}))
        }
    };
};

export const removeListRequest = (userId, shoppingListId) => {
    return async (dispatch, state) => {
        const lists = state().items.lists;
        const obj = {userId, shoppingListId};
        dispatch(
            setShoppingLists(
                lists.map(list =>
                    list._id === shoppingListId ? {...list, loading: true} : list,
                ),
            ),
        );
        const response = await fetch(`${SHOPPING_LIST_CREATE_URL}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        if (response.ok) {
            dispatch(
                setShoppingLists(lists.filter(list => list._id !== shoppingListId)),
            );
        } else {
            dispatch(setShoppingList(lists));
        }
    }
};


