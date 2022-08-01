import React from 'react';

import { IoIosArrowDown,IoIosArrowUp } from 'react-icons/io';
import RateComponent from '../Rate';
import './productDetails.scss';

// development
import productImg1 from '../../assets/images/1.jpg';
import productImg2 from '../../assets/images/2.jpg';
import productImg3 from '../../assets/images/3.webp';
import productImg4 from '../../assets/images/4.png';

export default function ProductDetailsComponent() {
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

    return (
        <div className="product">
            <div className="product-mainData">
                <div className="product-mainData_imgDiv">
                    <div className="product-mainData_imgDiv-imgs">
                        <button className="topBtn"><IoIosArrowUp/></button>
                        <button className="bottomBtn"><IoIosArrowDown/></button>
                        <img className="active" alt="product" onClick={displaySelectedImg} src={productImg1} />
                        <img alt="product" src={productImg2} onClick={displaySelectedImg} />
                        <img alt="product" src={productImg3} onClick={displaySelectedImg} />
                        <img alt="product" src={productImg4} onClick={displaySelectedImg} />
                        <img alt="product" src={productImg4} onClick={displaySelectedImg} />
                        <img alt="product" src={productImg4} onClick={displaySelectedImg} />
                    </div>
                    <img alt="product" id="displayedImg" src={productImg1} />
                </div>
                <div className="product-mainData_data">
                    <h1 className="product-mainData_data-name">product1</h1>
                    <h3 className="book-mainData_data-author">seller : sellerName</h3>
                    <div className="book-mainData_data-rate">
                        <RateComponent rate={5} />
                        <span>5 reviews</span>
                    </div>
                    <div className="product-mainData_data-priceDiv">
                        <span className="product-mainData_data-priceDiv_price">$20</span>
                    </div>

                    <p className="product-mainData_data-description">
                        gljsdgh jsdkghsdl;kjgn dlg oiajdglknz gh sdg;khsdgiuo hngsdnl;jn ds;b nsn udsghsdugh sngbkjsd
                        nbtn tnjkbn siobh nuibh nsiubh nstuibndst kbndsiubhdstui{' '}
                    </p>

                    <button className="product-mainData_data-btn">
                        <span>add to cart</span>
                        {/* <img src="/assets/svgs/loading.svg" /> */}
                    </button>
                </div>
            </div>
        </div>
    );
}
