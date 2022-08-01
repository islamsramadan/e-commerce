import React from 'react';

import ProductDetailsComponent from '../../components/productDetails';
import RelatedProductsComponent from '../../components/RelatedProducts';
import ProductReviews from '../../components/ProductReviews';

export default function ProductDetailsPage() {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12 col-lg-9">
                    <ProductDetailsComponent />
                    <ProductReviews />
                </div>
                <div className="col-12 col-lg-3" style={{ borderLeft: '1px solid #ccc' }}>
                    <RelatedProductsComponent/>
                </div>
            </div>
        </div>
    );
}
