import React from 'react';
import {Form} from "react-bootstrap";

const ProductPlaceholder = () => {
    return (
        <div className="flip mt-1 mx-auto w-100">
            <div className='d-flex justify-content-between  w-100 overflow-hidden'>
                <div className='d-flex w-100 align-items-center ml-2'>
                    <Form.Check
                        type={'checkbox'}
                        className='prod-checkbox mx-3'
                        onChange={() => {}}
                        checked={false}
                    />
                    <div className='placeholder-product my-1 w-100 section-styled-bg overflow-hidden d-flex justify-content-center'>
                        <div className='d-flex w-50 flex-column justify-content-center align-items-center'>
                            <div className='w-100 placeholder-product-text mb-2 mt-1 rounded text-center'/>
                            <div className='w-50 placeholder-product-small-text my-1 rounded text-center'/>
                        </div>
                    </div>
                    <div className='position-relative placeholder-product-avatar avatar-container mx-3 section-styled-bg overflow-hidden'/>
                </div>
            </div>
        </div>
    );
};

export default ProductPlaceholder;