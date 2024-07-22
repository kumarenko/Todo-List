import React, {useEffect, useState} from 'react';
import {
    addProductToList,
    deleteProductFromList,
    getShoppingList
} from "../../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import {Button, ButtonGroup} from "react-bootstrap";
import AddProductModal from "./AddProductModal";

const ListPage = ({list, getShoppingList,deleteProductFromList}) => {
    const { listId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const handleApply = () => setShowModal(false);
    const handleClose = () => setShowModal(false);
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    useEffect(() => {
        getShoppingList(listId);
    }, []);

    const check = (id) => {
        deleteProductFromList(list._id, id);
    }

    return (
        <div>
            <h3>{list.name}</h3>
            <div>
                {list.products?.length ? <ul>
                    {list.products.map(prod => <li key={prod._id}>
                        <button  onClick={() => check(prod._id)}>-</button>
                        <span>{prod.name}</span>
                    </li>)}
                </ul> : <span>There are no one product</span>}
            </div>

            <Button variant={buttonsVariant} onClick={() => setShowModal(true)}>Add Product</Button>
            <AddProductModal
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
        </div>
    );
};
const mapStateToProps = (state) => ({
    list: state.items.list,
    allProducts: state.items.allProducts,
});
const mapDispatchToProps = {
    getShoppingList,
    deleteProductFromList,
    addProductToList
};

export default connect(mapStateToProps,mapDispatchToProps)(ListPage);