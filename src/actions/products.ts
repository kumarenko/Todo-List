import {BARCODE_URL, PRODUCTS_URL, SHOPPING_LISTS_ADD_PROD_URL, SHOPPING_LISTS_EDIT_PROD_URL} from "../configs/urls";
import {setAllProducts, setBarcodeData, setShoppingList} from "../redux/shoppingListsReducer";
import axios from "axios";

export const getAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get(PRODUCTS_URL);
        dispatch(setAllProducts(response.data.products));
    }
}
export const addProductToList = (shoppingListId, product) => {
    return async (dispatch) => {
        const obj = {shoppingListId, product};
        const response = await fetch(
            `${SHOPPING_LISTS_ADD_PROD_URL}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        dispatch(setShoppingList(response))
    }
}
export const deleteProductFromList = (shoppingListId, product) => {
    return async (dispatch) => {
        const obj = {shoppingListId, product};
        const response = await fetch(
            `${SHOPPING_LISTS_EDIT_PROD_URL}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            }).then(res=>res.json());
        dispatch(setShoppingList(response));
    }
}

export const updateProductsListRequest = (shoppingListId, product) => {
    return async (dispatch) => {
        const objectToUpdate = {shoppingListId, product};
        const response = await fetch(
            `${SHOPPING_LISTS_EDIT_PROD_URL}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objectToUpdate)
            }).then(res=>res.json());
        dispatch(setShoppingList(response))
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
