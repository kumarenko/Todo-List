import {
    addListSuccess,
    addProductsToList,
    deleteList,
    setAllProducts,
    updateList,
    updateProductsList
} from "../redux/reducer";
import {setShoppingLists} from "../redux/reducer";
import {tempShoppingList, allProducts} from "../components/tempList";


export const getShoppingLists:unknown = () => {
    return (dispatch) => {
        dispatch(setShoppingLists(tempShoppingList))
    }
}
export const getAllProducts:unknown = () => {
    return (dispatch) => {
        dispatch(setAllProducts(allProducts))
    }
}

export const addProducts:unknown = ({id, name, added, count}, increment) => {
    return (dispatch) => {
        const newObj = {
            id,
            name,
            added: true,
            count: count+increment
        }
        dispatch(addProductsToList(newObj))
    }
}

export const addTodoRequest = (data) => {
    const temporaryPayload = {
        id: Math.floor(Math.round(2) * 100),
        name: data,
        items: []
    }
    return (dispatch) => {
        dispatch(addListSuccess(temporaryPayload));

    };
};


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
        const tempObj = {
            id: parentId,
            items: [{id: id, name, added, details}
            ]
        }

        dispatch(updateProductsList(tempObj));
    };
};
export const addProductToListRequest = (name, parentId, id, added, details) => {
    return (dispatch) => {
        const tempObj = {
            id: parentId,
            items: [{id: id, name, added: added, details}
            ]
        }
        dispatch(updateProductsList(tempObj));
    };
};


export const removeTodoRequest = (id) => {
    return (dispatch) => {
        dispatch(deleteList(id));

    };
};


