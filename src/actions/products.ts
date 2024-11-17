import {SHOPPING_LISTS_ADD_PROD_URL, SHOPPING_LISTS_EDIT_PROD_URL, UPLOAD_URL} from "../configs/urls";
import {setShoppingList} from "../redux/shoppingListsReducer";

export const addProductToList = (shoppingListId, product) => {
    return async (dispatch, state) => {
        let currentList = state().items.list;

        const obj = {shoppingListId, product};
        const response = await fetch(
            `${SHOPPING_LISTS_ADD_PROD_URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        dispatch(setShoppingList({...currentList, products: response}))
    }
}
export const deleteProductFromList = (shoppingListId, products) => {
    return async (dispatch, state) => {
        let currentList = state().items.list;
        const obj = {shoppingListId, products: products};
        const response = await fetch(
            `${SHOPPING_LISTS_EDIT_PROD_URL}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        dispatch(setShoppingList({...currentList, products: response}))
    }
}

export const updateProductsListRequest = (shoppingListId, products) => {
    return async (dispatch, state) => {
        let currentList = state().items.list;
        const objectToUpdate = {
            shoppingListId, products};
        const response = await fetch(`${SHOPPING_LISTS_EDIT_PROD_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectToUpdate),
        });

        if (!response.ok) {
            dispatch(setShoppingList(currentList));
        } else {
            const data = await response.json();
            dispatch(setShoppingList({ ...currentList, products: data }));
        }
    };
};

export const updateProductAvatarRequest = (shoppingListId, selectedFile, item, type) => {
    return async (dispatch, state) => {
        const currentList = state().items.list;
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('item', item._id);
        formData.append('listId', shoppingListId);
        formData.append('type', type);
        try {
            const response = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.success) {
                dispatch(setShoppingList({
                    ...currentList,
                    products: currentList.products.map(prod =>
                        prod._id === result.product._id
                            ? {
                                ...result.product,
                                avatar: `${result.product.avatar}?t=${Date.now()}` // Добавляем уникальный параметр
                            }
                            : prod
                    )
                }));
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
};
export const removeProductAvatarRequest = (shoppingListId, fileName, type, itemId) => {
    return async (dispatch, state) => {
        const currentList = state().items.list;
        try {
            const response = await fetch(UPLOAD_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {shoppingListId, fileName, type, itemId}),
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.success) {
                dispatch(setShoppingList({
                    ...currentList,
                    products: currentList.products.map(prod => prod._id === result.product._id ? {...result.product, avatar: null} : prod)
                }));
            }
        } catch (e) {
            console.error('Error deleting file:', e);

        }
    };
};
