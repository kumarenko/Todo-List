import {BARCODE_URL, SHOPPING_LISTS_ADD_PROD_URL, SHOPPING_LISTS_EDIT_PROD_URL} from "../configs/urls";
import {setAllProducts, setBarcodeData, setShoppingList} from "../redux/shoppingListsReducer";
import products from './../configs/products.json';
export const getAllProducts = () => {
    return (dispatch) => {
        dispatch(setAllProducts(products));
    }
}
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

export const findProductByBarcode = (barcode) => {
    return async (dispatch) => {
        const response = await fetch(
            `${BARCODE_URL}?barcode=${barcode}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res=>res.json());
        dispatch(setBarcodeData(response.products[0]))
    };
};
