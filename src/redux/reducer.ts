const SET_LISTS = "SET_LISTS";
const UPDATE_LIST = "UPDATE_LIST";
const ADD_LIST = "ADD_LIST";
const DELETE_LIST = "DELETE_LIST";
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';
const defaultState = {
    lists: [],
}

export default function todosReducer(state = defaultState, action) {
    switch (action.type) {

        case SET_LISTS:
            return {
                ...state,
                lists: action.payload,
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
                    list.id === action.payload.id ? { ...list, ...action.payload  } : list
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
export const addListSuccess = (list) => ({type: ADD_LIST,payload: list});
export const updateList = (list) => ({type:UPDATE_LIST, payload: list})
export const deleteList = (listId:number) => ({type:DELETE_LIST, payload: listId})
export const updateProductsList = (updateList:object) => ({type:UPDATE_PRODUCTS, payload: updateList})
