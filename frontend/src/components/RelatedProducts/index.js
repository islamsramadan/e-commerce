import React from 'react';

import productImg from '../../assets/images/1.jpg';
import './relatedProducts.scss';

export default function RelatedProductsComponent() {
    let products = [1, 2, 3, 4, 5];
    return (
        <div>
            <p>Related products</p>
            {products.map((product) => {
                return (
                    <div key={product} className="productItem">
                        <img alt="product" src={productImg} />
                        <div className="productItem-data">
                            <h5 className="productItem-data_title">product1</h5>
                            <h6 className="productItem-data_seller">seller1</h6>
                            <div className="productItem-data_priceDiv">
                                <span className="productItem-data_priceDiv-price">$20</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
