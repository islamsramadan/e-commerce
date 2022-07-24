import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import 'animate.css/animate.min.css';

import './ProductCard.scss';
// development
import productimage1 from '../../assets/images/1.jpg';
import productimage2 from '../../assets/images/2.jpg';
import productimage3 from '../../assets/images/3.webp';
import productimage4 from '../../assets/images/4.png';

export default function ProductCard(product) {
  let intervalId = null;

  // change image on hover on product card image
  function changeImgOnHover(e) {
    const images = Array.from(e.target.parentElement.querySelectorAll('img'));
    intervalId = setInterval(() => {
      let activeImg = images.find((el) => el.classList.contains('active'));
      activeImg.classList.remove('active');
      if (activeImg.nextSibling) {
        activeImg.nextSibling.classList.add('active');
        changeActiveDotOnHover(e.target.closest('.productCard-header'), images.indexOf(activeImg.nextSibling));
      } else {
        images[0].classList.add('active');
        changeActiveDotOnHover(e.target.closest('.productCard-header'), 0);
      }
    }, 1500);
  }

  // clear interval for product's img hover and reset active class to first image
  function clearHoverInterval(e) {
    const images = e.target.parentElement.querySelectorAll('img');
    for (let image of images) image.classList.remove('active');
    images[0].classList.add('active');
    clearInterval(intervalId);
    changeActiveDotOnHover(e.target.closest('.productCard-header'), 0);
  }

  // update active dot for active displayed image
  function changeActiveDotOnHover(target, i) {
    const dots = Array.from(target.querySelectorAll('.productCard-header_dotsDiv div'));
    for (let dot of dots) dot.classList.remove('active');
    dots[i].classList.add('active');
  }

  return (
    <div className="outer">
      <div className="productCard">
        <div className="productCard-header">
          <div className="productCard-header_imgsDiv" onMouseEnter={changeImgOnHover} onMouseLeave={clearHoverInterval}>
            <img
              alt="product"
              src={productimage2}
              className="animate__animated animate__fadeIn animate__faster active"
            />
            <img alt="product" src={productimage1} className="animate__animated animate__fadeIn animate__faster" />
            <img alt="product" src={productimage3} className="animate__animated animate__fadeIn animate__faster" />
            <img alt="product" src={productimage4} className="animate__animated animate__fadeIn animate__faster" />
          </div>
          <div className="productCard-header_dotsDiv">
            <div className="active"></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="productCard-detailsDiv">
          <h5>product name</h5>
          <h6>9.00£</h6>
          <button>
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}
