import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import RateComponent from '../Rate';
import './productDetails.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cartSlice';

// development
import productImg1 from '../../assets/images/1.jpg';
import productImg2 from '../../assets/images/2.jpg';
import productImg3 from '../../assets/images/3.webp';
import productImg4 from '../../assets/images/4.png';

export default function ProductDetailsComponent({ product }) {
    // console.log(product);
    function displaySelectedImg(e) {
        const displayedImg = document.getElementById('displayedImg');
        displayedImg.src = e.target.src;
        addActiveClickedImg(e.target);
    }

    function addActiveClickedImg(clickedImg) {
        let imgs = document.querySelectorAll('.product-mainData_imgDiv-imgs img');
        imgs.forEach((img) => img.classList.remove('active'));
        clickedImg.classList.add('active');
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addToCartHandel = (productId) => {
        dispatch(addToCart(productId));
        navigate('/cart');
    };

    return (
        <div className="product">
            <div className="product-mainData">
                <div className="product-mainData_imgDiv">
                    <div className="product-mainData_imgDiv-imgs">
                        {/* <button className="topBtn">
                            <IoIosArrowUp />
                        </button>
                        <button className="bottomBtn">
                            <IoIosArrowDown />
                        </button> */}
                        {/* <img className="active" alt="product" onClick={displaySelectedImg} src={productImg1} />
                        <img alt="product" onClick={displaySelectedImg} />
                        <img alt="product" src={productImg3} onClick={displaySelectedImg} />
                        <img alt="product" src={productImg4} onClick={displaySelectedImg} />
                        <img alt="product" src={productImg4} onClick={displaySelectedImg} />
                        <img alt="product" src={productImg4} onClick={displaySelectedImg} /> */}
                        {product.images?.map((image) => (
                            <img key={image} alt={product.name} src={image} onClick={displaySelectedImg} />
                        ))}
                    </div>

                    <img src={product?.images[0]} alt={product.name} id="displayedImg" />
                </div>
                <div className="product-mainData_data">
                    <h1 className="product-mainData_data-name">{product.name}</h1>
                    <h3 className="book-mainData_data-author">seller : {product.businessId?.name}</h3>
                    <div className="book-mainData_data-rate">
                        <RateComponent rate={Number(product.rating)} />
                        <span>{product.reviews?.length} reviews</span>
                    </div>
                    <div className="product-mainData_data-priceDiv">
                        <span className="product-mainData_data-priceDiv_price">{product.price} EGP</span>
                    </div>

                    <p className="product-mainData_data-description">{product.description}</p>

                    <button
                        className="product-mainData_data-btn"
                        onClick={() => addToCartHandel({ productId: product._id, quantity: 1 })}
                    >
                        <span>add to cart</span>
                        {/* <img src="/assets/svgs/loading.svg" /> */}
                    </button>
                </div>
            </div>
        </div>
    );
}
