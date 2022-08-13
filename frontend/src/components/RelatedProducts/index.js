import React from 'react';

import productImg from '../../assets/images/1.jpg';
import './relatedProducts.scss';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOneProduct, getRelatedProducts } from '../../store/products/productSlice';

export default function RelatedProductsComponent({ relatedProducts }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickHandel = (productID, productCategoryID) => {
        dispatch(getOneProduct(productID));
        dispatch(getRelatedProducts(productCategoryID));
        navigate(`/product/${productID}`);
    };

    let products = relatedProducts;
    // console.log('relatedProducts  -------------->', products);
    return (
        <div>
            <p>Related products</p>
            {products?.map((product) => {
                return (
                    <div
                        key={product._id}
                        className="productItem"
                        onClick={() => onClickHandel(product._id, product.category)}
                    >
                        <img alt="product" src={product.image} />
                        <div className="productItem-data">
                            <h6 className="productItem-data_title mb-2">{product.name}</h6>
                            <p className="productItem-data_seller">{product.businessId?.name}</p>
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
