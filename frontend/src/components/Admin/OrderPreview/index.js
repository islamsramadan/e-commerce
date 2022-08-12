import React from 'react';
import Button from 'react-bootstrap/Button';
import Rate from '../../Rate';
import { IoCloseCircle } from 'react-icons/io5';
import Table from 'react-bootstrap/Table';

import image1 from '../../../assets/images/1.jpg';
import image2 from '../../../assets/images/2.jpg';
import image3 from '../../../assets/images/3.webp';
import RateComponent from '../../Rate';
import profileImg from '../../../assets/images/user.jpg';
import './orderPreview.scss';

export default function OrderPreview() {
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
            <div className="orderPreview animate__animated animate__fadeIn">
                <div className="orderPreview-data">
                    <h2 className="orderPreview-data_title">Order's Details</h2>

                    <div className="row outerDiv data">
                        <div className="col-6 col-lg-2 title">
                            <p>ID</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>fsjflksnfosf</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Customer</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>llkdngpamlf</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Is Delivered</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>yes</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Delivered at</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>15/2/2022</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>is Paid</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>yes</p>
                        </div>
                        <div className="col-6 col-lg-2 title">
                            <p>Paid at</p>
                        </div>
                        <div className="col-6 col-lg-4">
                            <p>15/2/2022</p>
                        </div>
                        <div className="col-12 compositDiv">
                            <h4 className="compositDiv-title">Address</h4>
                            <Table className="w-auto">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold"><p>City</p></td>
                                        <td><p>Alex</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><p>Street</p></td>
                                        <td><p>lkvnl gjj ljrglerlkl</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><p>Building</p></td>
                                        <td><p>169</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><p>Floor</p></td>
                                        <td><p>8</p></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-12 compositDiv">
                            <h4 className="compositDiv-title">Products</h4>
                            <Table className="w-auto">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold"><p>City</p></td>
                                        <td><p>Alex</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><p>Street</p></td>
                                        <td><p>lkvnl gjj ljrglerlkl</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><p>Building</p></td>
                                        <td><p>169</p></td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold"><p>Floor</p></td>
                                        <td><p>8</p></td>
                                    </tr>
                                </tbody>
                            </Table>
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
