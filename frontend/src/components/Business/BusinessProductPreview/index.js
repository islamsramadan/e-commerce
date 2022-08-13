import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Rate from '../../Rate';
import { IoCloseCircle } from 'react-icons/io5';
import { CgAdd } from 'react-icons/cg';
import { Routes, Route, useParams, Link } from 'react-router-dom';

import image1 from '../../../assets/images/1.jpg';
import image2 from '../../../assets/images/2.jpg';
import image3 from '../../../assets/images/3.webp';
import RateComponent from '../../Rate';
import profileImg from '../../../assets/images/user.jpg';
import './businessProductPreview.scss';

export default function BusinessProductPreview() {
    const reviews = [1, 2, 3];
    let [productData, setProductData] = useState({});
    let { id } = useParams();

    useEffect(() => {
        getProductData();
    }, []);

    async function getProductData() {
        const res = await fetch(`http://localhost:8080/products/${id}`);
        const data = await res.json();
        setProductData(data.fullData);
        console.log(data.fullData);
    }

    async function deleteProduct() {
        const res = await fetch(`http://localhost:8080/products/${id}`);
        const data = await res.json();
        setProductData(data.fullData);
        console.log(data.fullData);
    }

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
                            <p>{productData?.name}</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Description</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>{productData?.description}</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Brand</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>{productData?.brand}</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Category</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>{productData?.category}</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Price</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>{productData?.price} LE</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Count in stock</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>{productData?.countInStock}</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Rate</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <Rate rate={productData?.rating || 0} />
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>number of reviews</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>{productData?.numReviews}</p>
                        </div>
                        <div className="col-12">
                            <Link to={'/business/products/edit/' + id} className="ms-2 btn btn-primary">
                                Edit
                            </Link>
                            <Button variant="danger" onClick={deleteProduct}>
                                Delete
                            </Button>
                        </div>
                    </div>

                    <div className="outerDiv">
                        <h2>Images</h2>
                        <div className="images">
                            {productData?.images?.map((imgSrc) => {
                                return (
                                    <div>
                                        <img src={imgSrc} onClick={displayImgPreview} />
                                        <Button variant="danger">Delete</Button>
                                    </div>
                                );
                            })}
                            <div>
                                <button className="addBtn position-relative">
                                    <CgAdd />
                                    Add
                                    <input
                                        type="file"
                                        style={{
                                            opacity: 0,
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            top: 0,
                                            left: 0,
                                        }}
                                    />
                                </button>
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
