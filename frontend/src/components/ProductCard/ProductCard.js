import React from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOneProduct, getRelatedProducts } from '../../store/products/productSlice';

import './ProductCard.style.scss';
// development
import productimage from '../../assets/home-slider/slide-1.png';

export default function ProductCard({ product }) {
    // console.log(product);

    // add product details
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickHandel = (productID, productCategoryID) => {
        dispatch(getOneProduct(productID));
        dispatch(getRelatedProducts(productCategoryID));
        navigate(`/product/${productID}`);
    };

    return (
        <div className="outer" onClick={() => onClickHandel(product._id, product.category)}>
            <div className="productCard">
                <Link to={`/product/${product._id}`}>
                    <div className="productCard-imgDiv">
                        <img width="50" alt="product" src={productimage} />
                    </div>
                </Link>
                <div className="productCard-detailsDiv">
                    <h5>{product.name}</h5>
                    <h6>{product.price}EGP</h6>
                </div>
            </div>
        </div>
    );
}
