import {setShoppingList} from "../redux/shoppingListsReducer";
import {setShoppingLists} from "../redux/shoppingListsReducer";
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";
import {
    SHOPPING_LISTS_URL, SHOPPING_LIST_CREATE_URL,
    SHOPPING_LIST_SHARE_URL, SYNC_ALL_LISTS_URL, UPLOAD_URL, CLOUD_URL
} from "../configs/urls";
import {t} from "i18next";

export const getShoppingLists = (userId: string) => {
    return async (dispatch, state) => {
        const userData = state().user;
        if(userData.user.role === 'USER') {
            const response = await axios.get(
                SHOPPING_LISTS_URL, {params: {userId}});
            dispatch(setShoppingLists(response.data.shoppingLists))
        } else {
            const lists = state().items.lists;
            dispatch(setShoppingLists(lists));
        }
    }
}

export const getShoppingList = (listId, userId, navigate) => {
    return async (dispatch, state) => {
        const userData = state().user;
        try {
            if (userData.user.role === 'USER') {
                const response = await axios.get(
                    `${SHOPPING_LISTS_URL}/${listId}`, {params: {userId}});
                if(response.status === 200) {
                    dispatch(setShoppingList(response.data))
                }
            } else {
                const currentList = state().items.lists.find(list => list._id === listId);
                dispatch(setShoppingList(currentList));
            }
        } catch (e) {
            navigate('/');
        }
    }
}
export const addShoppingList = (userId, name) => {
    return async (dispatch, state) => {
        const userData = state().user;
        if(!name || name.trim() === '') {
            name = t('New list');
        }
        const obj = {userId,name};
        if(userData.user.role === 'USER') {
            const response = await fetch(
                `${SHOPPING_LIST_CREATE_URL}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj)
                }).then(res=>res.json());
            dispatch(setShoppingLists(response.shoppingLists))
        } else {
            let allLists = state().items.lists || [];
            const newList = {
                _id: uuidv4(),
                temporary: true,
                name: {value: name, temporary: true},
                products: [],
                creator: {
                    id: userId,
                    name: userData.user.name,
                    email: userData.user.email,
                },
                userOwners: [
                    {
                        _id: userId,
                        name: userData.user.name,
                        email: userData.user.email,
                        temporary: true,
                    },
                ],
            };
            dispatch(setShoppingLists([...allLists, newList]));
        }
    }
}

export const updateListRequest = (list, newValue) => {
    return async (dispatch, state) => {
        const userData = state().user;
        if(newValue.length > 0) {
            if (userData.user.role === 'USER') {
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
            } else {
                dispatch(setShoppingList({
                    ...list,
                    name: {
                        value: newValue,
                        temporary: true,
                    }
                }));
            }
        }
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
        const userData = state().user;
        if(userData.user.role === 'USER') {
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
            const prodsWithAvatarsFromLocalList = lists.find(list => list._id === shoppingListId).products.filter(prod => prod.avatar);
            prodsWithAvatarsFromLocalList.forEach((prod) => {
                fetch(UPLOAD_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( {shoppingListId, fileName: prod.avatar.replace(CLOUD_URL, '').split('?')[0], itemId: prod._id}),
                });
            });
            if (response.ok) {
                dispatch(
                    setShoppingLists(lists.filter(list => list._id !== shoppingListId)),
                );
            } else {
                dispatch(setShoppingList(lists));
            }
        } else {
            const prodsWithAvatarsFromLocalList = lists.find(list => list._id === shoppingListId).products.filter(prod => prod.avatar);
            dispatch(setShoppingLists(lists.filter(list => list._id !== shoppingListId)));
            prodsWithAvatarsFromLocalList.forEach((prod) => {
               fetch(UPLOAD_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify( {shoppingListId, fileName: prod.avatar.replace(CLOUD_URL, '').split('?')[0], itemId: prod._id}),
                });
            });
        }
    }
};

export const synchronizeLocalLists = (unSynchronizedLists, userId) => {
    return async (dispatch) => {
        if (unSynchronizedLists.length) {
            let localLists = [];
            unSynchronizedLists.forEach(list => {
                localLists = [
                    ...localLists,
                    {
                        _id: list._id,
                        name: {value: list.name.value},
                        products: list.products,
                        userOwners: [],
                    },
                ];
            });
            const payload = {userId, localLists};
            const response = await fetch(`${SYNC_ALL_LISTS_URL}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            }).then(res => res.json());
            dispatch(setShoppingLists(response.updatedLists));
        }
    };
};