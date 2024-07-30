import React, {useEffect, useState} from 'react';
import FlipMove from "react-flip-move";
import {getShoppingList} from "../../../../actions/shoppingLists";
import {updateProductsListRequest} from "../../../../actions/products";
import {addProductToList, deleteProductFromList} from "../../../../actions/products";
import {connect, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

const ListPage = ({list, getShoppingList,updateProductsListRequest}) => {
    const { listId } = useParams();
    const [checkedProds, setCheckedProds] = useState([]);
    const [uncheckedProds,setUncheckedProds] = useState([]);
    const [showAddModal, setAddShowModal] = useState(false);
    const handleApply = () => setAddShowModal(false);
    const handleClose = () => setAddShowModal(false);

    const [showEditModal, setEditShowModal] = useState(false);
    const handleApplyEdit = () => setEditShowModal(false);
    const handleCloseEdit = () => setEditShowModal(false);
    const [product, setProduct] = useState({});
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    useEffect(() => {
        getShoppingList(listId);
    }, []);

    useEffect(() => {
        if(list.products) {
            let checked = [];
            list.products.forEach(prod => {
                prod.checked ?
                    checked.push(prod) :
                    checked.splice(checked.indexOf(prod), 0);
            });
            setCheckedProds(checked);
            setUncheckedProds(list.products.filter(prod => !prod.checked));
        }
    }, [list]);

    const selectProduct = (prod) => {
        setEditShowModal(true);
        setProduct(prod);
    }
    const checkProduct = (selectedProd) => {
        const prod = {
            ...selectedProd,
            productId: selectedProd._id,
            checked: !selectedProd.checked
        }
        updateProductsListRequest(list._id, prod);
    };
    return (
        <div className='list-page'>
            <h3>{list?.name}</h3>
            <div>
                {checkedProds.length ? <FlipMove>
                    {checkedProds.map(prod => <div className='d-flex align-items-center' key={prod._id}>
                        <Form.Check
                            type={'checkbox'}
                            checked={prod.checked}
                            onChange={() => checkProduct(prod)}
                            id={prod._id}
                        />
                        <Button
                            variant={buttonsVariant}
                            className='my-1'
                            onClick={() => selectProduct(prod)}>
                            {prod.name} <span style={{filter: 'brightness(0.5)'}}>{prod.count}</span>
                        </Button>
                        {prod.price ? <span> {prod.price} $</span> : null}
                        {prod.category ? <span> {prod.category}</span> : null}
                    </div>)}
                </FlipMove> : <span>There are no one product</span>}
                {uncheckedProds.length ? <FlipMove>
                    {uncheckedProds.map(prod => <div className='d-flex align-items-center' key={prod._id}>
                        <Form.Check
                            type={'checkbox'}
                            checked={prod.checked}
                            onChange={() => checkProduct(prod)}
                            id={prod._id}
                        />
                        <Button
                            variant={buttonsVariant}
                            className='my-1'
                            onClick={() => selectProduct(prod)}>
                            {prod.name} <span style={{filter: 'brightness(0.5)'}}>{prod.count}</span>
                        </Button>
                        {prod.price ? <span> {prod.price} $</span> : null}
                        {prod.category ? <span> {prod.category}</span> : null}
                    </div>)}
                </FlipMove> : <span>There are no one product</span>}
            </div>

            <Button variant={buttonsVariant} onClick={() => setAddShowModal(true)}>Add Product</Button>
            <AddProductModal
                show={showAddModal}
                onHide={handleClose}
                onApply={handleApply}
            />
            <EditProductModal
                show={showEditModal}
                product={product}
                onHide={handleCloseEdit}
                onApply={handleApplyEdit}
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
    addProductToList,
    updateProductsListRequest
};

export default connect(mapStateToProps,mapDispatchToProps)(ListPage);