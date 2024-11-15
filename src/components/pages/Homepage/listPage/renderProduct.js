import React from 'react';

import {connect} from 'react-redux';
import {Button} from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import {addProductToList, deleteProductFromList, updateProductsListRequest} from "../../../../actions/products";

const RenderProduct = ({
                           item,
                           list,
                           updateProductsListRequest,
                           addProductToList,
                           deleteProductFromList,
                       }) => {

    const elemInList = list.products.find(elem => elem.name === item.name);


    return (
        <div key={item._id} className='position-relative d-flex flex-nowrap w-100 my-1'>
            <Button
                className={`w-100 rounded-pill`}
                onClick={() => {
                    const prod = {
                        _id: elemInList?._id ?? null,
                        name: item.name,
                        category: item.category,
                        count: elemInList?.count ?? 1,
                        checked: !!item.checked,
                        price: item.price,
                        selectionCount: item.selectionCount || 1,
                    };
                    addProductToList(list._id, prod);
                }}>
                <div className='position-relative d-flex justify-content-between align-items-center'>
                    <FiPlus/>
                    <span>
                        {item.name}
                    </span>
                    <span style={{minWidth: 50, marginRight: 25}}>{elemInList?.count ? `${elemInList.count} pcs` : ''}</span>
                </div>
            </Button>
            {elemInList && elemInList.count > 1 && (
                <Button
                    style={{width: 38}}
                    className={`prod-edit-btn d-flex align-items-center h-100 position-absolute end-0 rounded-end-pill border-start-0`}
                    onClick={() => {
                        const prod = {
                            ...elemInList,
                            count: elemInList.count - 1,
                        };
                        updateProductsListRequest(list._id, [prod]);
                    }}
                >
                    <FiMinus/>
                </Button>
            )}
            {elemInList?.count === 1 && (
                <Button
                    style={{width: 38}}
                    className={`prod-edit-btn d-flex align-items-center h-100 position-absolute end-0 rounded-end-pill border-start-0`}
                    onClick={() => {
                        const prod = {
                            ...elemInList,
                            count: elemInList.count - 1,
                        };
                        deleteProductFromList(list._id, [prod]);
                    }}
                >
                    <IoClose />
                </Button>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        list: state.items.list,
    };
};

const mapDispatchToProps = {
    addProductToList,
    updateProductsListRequest,
    deleteProductFromList,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderProduct);