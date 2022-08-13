import React from 'react';

import ProductDetailsComponent from '../../components/productDetails';
import RelatedProductsComponent from '../../components/RelatedProducts';
import ProductReviews from '../../components/ProductReviews';

import { useSelector } from 'react-redux';

export default function ProductDetailsPage() {
    const { productDetails } = useSelector((state) => state.products);
    const { relatedProducts } = useSelector((state) => state.products);
    console.log(productDetails, relatedProducts);
    return (
        <div className="container mt-3">
            {productDetails && (
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <ProductDetailsComponent product={productDetails} />
                        <ProductReviews product={productDetails} />
                    </div>
                    <div className="col-12 col-lg-3" style={{ borderLeft: '1px solid #ccc' }}>
                        <RelatedProductsComponent relatedProducts={relatedProducts} />
                    </div>
                </div>
            )}
        </div>
    );
}
