import React, {useEffect, useState} from 'react';
import FlipMove from "react-flip-move";
import {
    addProductToList,
    deleteProductFromList,
    getShoppingList
} from "../../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

const ListPage = ({list, getShoppingList}) => {
    const { listId } = useParams();
    const [allProds, setAllProds] = useState([]);
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
        setAllProds(list.products ?? []);
    }, []);

    useEffect(() => {
        setAllProds(list.products ?? []);
        // prevent update request if name didn`t change
        if(product._id) {
            setProduct(list.products.find(item => item._id === product._id))
        }
    }, [list]);

    const selectProduct = (prod) => {
        setEditShowModal(true);
        setProduct(prod);
    }
    const checkProduct = (selectedProd) => {
        setAllProds((prevProducts) => {
            const filteredProducts = prevProducts.filter(prod => prod._id !== selectedProd._id);
            return [...filteredProducts, selectedProd];
        });
    };
    return (
        <div className='list-page'>
            <h3>{list?.name}</h3>
            <div>
                {allProds.length ? <FlipMove>
                    {allProds.map(prod => <div className='d-flex align-items-center' key={prod._id}>
                        <Form.Check
                            type={'checkbox'}
                            onChange={() => checkProduct(prod)}
                            id={`check-${prod._id}`}
                        />
                        <Button
                            variant={buttonsVariant}
                            className='my-1'
                            onClick={() => selectProduct(prod)}>
                            {prod.name}
                        </Button>
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
    addProductToList
};

export default connect(mapStateToProps,mapDispatchToProps)(ListPage);