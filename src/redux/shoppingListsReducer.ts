import {ShoppingList} from "../types/types";

const SET_LISTS = "SET_LISTS";
const SET_LIST = "SET_LIST";
const SET_PRODUCTS = "SET_PRODUCTS";
const UPDATE_LIST = "UPDATE_LIST";
const ADD_LIST = "ADD_LIST";
const DELETE_LIST = "DELETE_LIST";
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
const ADD_PRODUCTS = 'ADD_PRODUCTS';
const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';
const ADD_BARCODE_PROD = 'ADD_BARCODE_PROD';

export const defaultState: { lists: ShoppingList[], allProducts: ShoppingList[], list: {}, productFromBarcode: {} } = {
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
    allProducts: [],
    productFromBarcode: {}
}

export default function todosReducer(state = defaultState, action) {
    switch (action.type) {

        case SET_LISTS:
            return {
                ...state,
                lists: action.payload,
            }
        case SET_LIST:
            return {
                ...state,
                list: action.payload,
                lists: state.lists.map(list =>
                    list._id === action.payload._id ? { ...list, ...action.payload  } : list
                )
            }
        case SET_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
            }

        case ADD_LIST:
            return {
                ...state,
                loading: false,
                lists: [...state.lists, action.payload],
            };
        case UPDATE_LIST:
            return {
                ...state,
                loading: false,
                lists: state.lists.map(list =>
                    list._id === action.payload._id ? { ...list, ...action.payload  } : list
                ),
            };
        case UPDATE_TODO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_LIST:
            const listId = action.payload;
            return {
                ...state,
                lists: state.lists.filter(list =>
                    list.id !== listId
                ),
            };
        case ADD_PRODUCTS:
            return {
                ...state,
                loading: false,
                allProducts: state.allProducts.map(prod =>
                    prod._id === action.payload._id ? { ...prod, ...action.payload  } : prod
                ),
            };
        case ADD_BARCODE_PROD:
            return {
                ...state,
                loading: false,
                productFromBarcode: action.payload,
            };

        case UPDATE_PRODUCTS:
            const newProd = action.payload.items[0];
            const initialProds = state.lists[action.payload.id].items;
            const updatedList = initialProds.map(prod => (prod.id === newProd.id ? newProd : prod));
            let newLists = state.lists.map(list => {
                if(list.id === action.payload.id ) {
                    return {
                        id: list.id,
                        name: list.name,
                        items: updatedList
                    }
                } else{
                    return list
                }
            });
            return {
                ...state,
                lists: newLists
            };

        default:
            return state
    }
}

export const setShoppingLists = (lists) => ({type:SET_LISTS, payload:lists})
export const setShoppingList = (list) => ({type:SET_LIST, payload:list})
export const setAllProducts = (products) => ({type:SET_PRODUCTS, payload:products})
export const setBarcodeData = (prod:object) => ({type:ADD_BARCODE_PROD, payload: prod})
