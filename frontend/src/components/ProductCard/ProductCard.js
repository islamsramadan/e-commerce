import React from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";

import './ProductCard.style.scss';
// development
import productimage from '../../assets/home-slider/slide-1.png';

export default function ProductCard(product) {
    return (
        <div className="outer">
            <div className="productCard">
                <Link to="/">
                    <div className="productCard-imgDiv">
                        <img width="50" alt="product" src={productimage} />
                    </div>
                </Link>
                <div className="productCard-detailsDiv">
                    <h5>product name</h5>
                    <h6>9.00£</h6>
                    <button>add icon</button>
                </div>
            </div>
        </div>
    );
}
