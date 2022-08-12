import React from 'react';

import productImg from '../../assets/images/1.jpg';
import './relatedProducts.scss';

export default function RelatedProductsComponent({ relatedProducts }) {
    let products = relatedProducts;
    return (
        <div>
            <p>Related products</p>
            {products.map((product) => {
                return (
                    <div key={product._id} className="productItem">
                        <img alt="product" src={productImg} />
                        <div className="productItem-data">
                            <h6 className="productItem-data_title mb-2">{product.name}</h6>
                            <p className="productItem-data_seller">{product.businessId.name}</p>
                            <div className="productItem-data_priceDiv">
                                <span className="productItem-data_priceDiv-price">{product.price} EGP</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
