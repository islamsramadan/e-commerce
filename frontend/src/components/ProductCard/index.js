import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './ProductCard.scss';
// development
import productimage from '../../assets/images/3.webp';

export default function ProductCard(product) {
  return (
    <div className="outer">
      <div className="productCard">
        <div className="productCard-imgDiv">
          <img alt="product" src={productimage} />
        </div>
        <div className="productCard-detailsDiv">
          <h5>product name</h5>
          <h6>9.00£</h6>
          <button>
          <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
