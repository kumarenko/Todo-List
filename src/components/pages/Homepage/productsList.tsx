import React, {useState} from 'react';
import {addProductToListRequest, updateProductsListRequest} from "../../../actions/shoppingLists";
import {connect, useSelector} from "react-redux";
import {Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import {IoMdAddCircleOutline, IoMdRemoveCircleOutline} from "react-icons/io";
import AddProductModal from "./AddProductModal";

const ProductsList = ({parentId, products, addProductToListRequest}) => {
    const [showModal, setShowModal] = useState(false);
    const handleApply = () => setShowModal(false);
    const handleClose = () => setShowModal(false);

    const renameProduct = (newValue, parentId, productId, added, details, count) => {
        addProductToListRequest(newValue, parentId, productId, added, details, count);
    }
    const selectProduct = (newValue, parentId, productId, added, details, count) => {
        addProductToListRequest(newValue, parentId, productId, !added, details, count);
    }
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    return (
        <div>
            {products.length ?
                products.map(item => <ButtonToolbar className='mb-2' aria-label="Toolbar with button groups" key={item._id}>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant={buttonsVariant} onClick={() => selectProduct(item.name, parentId, item._id, item.added, item.details, item.count)}>
                        {item.added ? <IoMdRemoveCircleOutline />
                            : <IoMdAddCircleOutline color={'#00ff00'} />
                        }</Button>
                    <input type="text"
                           id={item.name}
                           className='fancy-checkbox-primary'
                           defaultValue={item.name}
                           onBlur={(e) => {
                               if (e.target.value !== item.name) {
                                   renameProduct(e.target.value, parentId, item._id, item.added, item.details, item.count)
                               }
                           }}/>
                </ButtonGroup>

            </ButtonToolbar>) : null}
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
    lists: state.items.lists
});
const mapDispatchToProps = {
    updateProductsListRequest,
    addProductToListRequest,
};
export default connect(mapStateToProps,mapDispatchToProps)(ProductsList)
