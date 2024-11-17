import {ShoppingList} from "../types/types";

const SET_LISTS = "SET_LISTS";
const SET_LIST = "SET_LIST";
const ADD_LIST = "ADD_LIST";
const DELETE_LIST = "DELETE_LIST";
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const defaultListsState: { lists: ShoppingList[], list: {}} = {
    lists: [],
    list: {
        _id: '',
        name: {
            value: ''
        },
        products: [],
        userOwners: [],
        creator: '',
    },
}

export default function todosReducer(state = defaultListsState, action) {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                lists: action.payload,
            };
        case SET_LIST:
            return {
                ...state,
                list: action.payload,
                lists: state.lists.map(list =>
                    list._id === action.payload._id ? action.payload : list
                ),
            };

        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, action.payload],
            };


        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(list => list._id !== action.payload),
            };

        case UPDATE_PRODUCTS: {
            const { id, items } = action.payload;
            const newProd = items[0];

            const newLists = state.lists.map(list => {
                if (list.id === id) {
                    return {
                        ...list,
                        items: list.items.map(prod =>
                            prod.id === newProd.id ? newProd : prod
                        ),
                    };
                }
                return list;
            });

            return {
                ...state,
                lists: newLists,
            };
        }

        case UPDATE_TODO_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
}

export const setShoppingLists = (lists) => ({type:SET_LISTS, payload:lists})
export const setShoppingList = (list) => ({type:SET_LIST, payload:list})
