import React from 'react';

const ProductsList = ({products}) => {
    const selectProduct = (event) => {

    }
    return (
        <div>
            {products.map(item => <div key={item.id}>
                <input type="checkbox"
                       id={item.name}
                       checked={item.status === 'DONE'}
                       onChange={(e) => selectProduct(e)}/>
                <label htmlFor={item.name}>{item.name}</label>
            </div>)}
        </div>
    );
};

export default ProductsList;