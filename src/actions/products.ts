import {SHOPPING_LISTS_ADD_PROD_URL, SHOPPING_LISTS_EDIT_PROD_URL, UPLOAD_URL} from "../configs/urls";
import {setShoppingList} from "../redux/shoppingListsReducer";
import {v4 as uuidv4} from "uuid";
import {updateUnits} from "../redux/settingsReducer";
import {updateProfileData, updateProfileSuccessMessage} from "../redux/userReducer";

export const addProductToList = (shoppingListId, product) => {
    return async (dispatch, state) => {
        const currentList = state().items.list;
        const userData = state().user;
        if(userData.user.role === 'USER') {
            const obj = {shoppingListId, product};
            const response = await fetch(
                `${SHOPPING_LISTS_ADD_PROD_URL}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj)
                }).then(res=>res.json());
            dispatch(setShoppingList({...currentList, products: response}));
        } else {
            dispatch(setShoppingList({
                ...currentList,
                products: [...currentList.products, {...product, _id: uuidv4()}]
            }));
        }
    }
}
export const deleteProductFromList = (shoppingListId, products) => {
    return async (dispatch, state) => {
        let currentList = state().items.list;
        const userData = state().user;
        if(userData.user.role === 'USER') {

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
        } else {
            let productsToDelete =  new Set(products.map(item => item._id));
            const result = currentList.products.filter(item => !productsToDelete.has(item._id));
            dispatch(setShoppingList({...currentList, products: result}))
        }
    }
}

export const updateProductsListRequest = (shoppingListId, products) => {
    return async (dispatch, state) => {
        let currentList = state().items.list;
        const userData = state().user;
        if(userData.user.role === 'USER') {
            const objectToUpdate = {shoppingListId, products};
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
        } else {
            console.log('prodsss', products);

            let productsToUpdate =  new Set(products.map(item => item._id));
            const result = currentList.products.map(item => productsToUpdate.has(item._id) ? products.find(i => i._id) : item);
            dispatch(setShoppingList({...currentList, products: result}))
        }
    };
};

export const updateProductAvatarRequest = (shoppingListId, selectedFile, itemId) => {
    return async (dispatch, state) => {
        const currentList = state().items.list;
        const formData = new FormData();
        const userData = state().user;
        formData.append('file', selectedFile);
        formData.append('item', itemId);
        formData.append('listId', shoppingListId);
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
                if(userData.user.role === 'USER') {
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
                } else {
                    dispatch(setShoppingList({
                        ...currentList,
                        products: currentList.products.map(prod =>
                            prod._id === itemId
                                ? {
                                    ...prod,
                                    avatar: `${result.fileUrl}?t=${Date.now()}` // Добавляем уникальный параметр
                                }
                                : prod
                        )
                    }));
                }
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
};
export const removeProductAvatarRequest = (shoppingListId, fileName, itemId) => {
    return async (dispatch, state) => {
        const currentList = state().items.list;
        const userData = state().user;
        try {
            const response = await fetch(UPLOAD_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( {shoppingListId, fileName, itemId}),
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.success) {
                if(userData.user.role === 'USER') {
                    dispatch(setShoppingList({
                        ...currentList,
                        products: currentList.products.map(prod => prod._id === itemId ? {...prod, avatar: null} : prod)
                    }));
                } else {
                    dispatch(setShoppingList({
                        ...currentList,
                        products: currentList.products.map(prod => prod._id === itemId ? {...prod, avatar: null} : prod)
                    }));
                }
            }
        } catch (e) {
            console.error('Error deleting file:', e);
        }
    };
};
