import React from 'react';
import Button from 'react-bootstrap/Button';
import Rate from '../../Rate';
import { IoCloseCircle } from 'react-icons/io5';

import image1 from '../../../assets/images/1.jpg';
import image2 from '../../../assets/images/2.jpg';
import image3 from '../../../assets/images/3.webp';
import RateComponent from '../../Rate';
import profileImg from '../../../assets/images/user.jpg';
import './productPreview.scss';

export default function ProductPreview() {
    const reviews = [1, 2, 3];

    function closeImgPreview() {
        const imgPreview = document.querySelector('.imgPreview');
        document.querySelector('body').style.overflowY = 'auto';
        imgPreview.classList.add('d-none');
    }

    function displayImgPreview(e) {
        const imgPreviewDiv = document.querySelector('.imgPreview');
        const imgPreview = imgPreviewDiv.querySelector('img');
        const clickedImgSource = e.target.src;
        document.querySelector('body').style.overflowY = 'hidden';
        imgPreviewDiv.classList.remove('d-none');
        imgPreview.src = clickedImgSource;
    }

    return (
        <>
            <div className="productPreview animate__animated animate__fadeIn">
                <div className="productPreview-data">
                    <h2 className="productPreview-data_title">Product's Details</h2>

                    <div className="row outerDiv data">
                        <div className="col-6 col-lg-2 title">
                            <p>Name</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>fsjflksnfosf</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Description</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>llkdngpamlfs; rsgm ;lg ;slagj;lg</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Brand</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>apple</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Category</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>mobile</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Price</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>50$</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Count in stock</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>57</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Rate</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <Rate rate={4} />
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>number of reviews</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>24</p>
                        </div>
                        <div className="col-12">
                            <Button variant="danger">Delete</Button>
                        </div>
                    </div>

                    <div className="outerDiv">
                        <h2>Images</h2>
                        <div className="images">
                            <div>
                                <img src={image1} onClick={displayImgPreview} />
                                <Button variant="danger">Delete</Button>
                            </div>
                            <div>
                                <img src={image2} onClick={displayImgPreview} />
                                <Button variant="danger">Delete</Button>
                            </div>
                            <div>
                                <img src={image3} onClick={displayImgPreview} />
                                <Button variant="danger">Delete</Button>
                            </div>
                        </div>
                    </div>

                    <div className="outerDiv">
                        <h2>Reviews</h2>
                        {reviews.map((review) => {
                            return (
                                <div key={review} className="reviews-contentContainer">
                                    <div>
                                        <img alt="product" src={profileImg} />
                                        <div className="reviews-contentContainer-content">
                                            <div className="reviews-contentContainer-content_row">
                                                <h6>moemen</h6>
                                                <span> rated it </span>
                                                <RateComponent rate={3} />
                                            </div>
                                            <div className="reviews-contentContainer-content_row">
                                                <span>15/2/2020</span>
                                            </div>
                                            <div className="reviews-contentContainer-content_row">
                                                <p>tex ttex tlkd sfhjlksdf jhoishjlkdbmdfpjkbpad </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="danger">Delete</Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="imgPreview d-none animate__animated animate__fadeIn animate__faster">
                <div>
                    <button onClick={closeImgPreview}>
                        <IoCloseCircle />
                    </button>
                    <img />
                </div>
            </div>
        </>
    );
}
