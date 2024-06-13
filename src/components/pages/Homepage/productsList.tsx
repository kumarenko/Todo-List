import React from 'react';
import {addProductToListRequest, updateProductsListRequest} from "../../../actions/todos";
import {connect} from "react-redux";
import {Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import {IoMdAddCircleOutline, IoMdRemoveCircleOutline} from "react-icons/io";

const ProductsList = ({parentId, products, addProductToListRequest}) => {
    const renameProduct = (newValue, parentId, productId, added, details) => {
        addProductToListRequest(newValue, parentId, productId, added, details);
    }
    const selectProduct = (newValue, parentId, productId, added, details) => {
        addProductToListRequest(newValue, parentId, productId, !added, details);
    }

    return (
        <div>
            {products.map(item => <ButtonToolbar className='mb-2' aria-label="Toolbar with button groups" key={item.id+item.name}>
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button onClick={() => selectProduct(item.name, parentId, item.id, item.added, item.details)}>
                        {item.added ? <IoMdRemoveCircleOutline />
                            : <IoMdAddCircleOutline color={'#00ff00'} />
                        }</Button>
                    <input type="text"
                           id={item.name}
                           className='fancy-checkbox-primary'
                           defaultValue={item.name}
                           onBlur={(e) => {
                               renameProduct(e.target.value, parentId, item.id, item.added, item.details)
                           }}/>
                </ButtonGroup>

            </ButtonToolbar>)}
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
