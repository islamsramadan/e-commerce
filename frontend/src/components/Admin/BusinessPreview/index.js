import React from 'react';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import Rate from '../../Rate';

import image1 from '../../../assets/images/1.jpg';
import image2 from '../../../assets/images/2.jpg';
import image3 from '../../../assets/images/3.webp';
import image4 from '../../../assets/images/4.png';

import './businessPreview.scss';

export default function BusinessPreview() {
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
            <div className="businessPreview animate__animated animate__fadeIn">
                <div className="businessPreview-data">
                    <div className="businessPreview-data_img">
                        <img src={image1} />
                    </div>

                    <h2 className="businessPreview-data_title">Business's data</h2>
                    <div className="businessPreview-data_actions">
                        <Button>Activate account</Button>
                        <Button variant="danger">Deactivate account</Button>
                        <Button variant="danger">Remove user</Button>
                    </div>

                    <div className="row outerDiv data">
                        <div className="col-6 col-lg-3 title">
                            <p>ID</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>fsjflksnfosf</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>Name</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>Moemen Said</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>Email</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>moemen@Yahoo.com</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>Phone</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>0123456789</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>City</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>Alexandria</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>Street</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>gamal abd elnaser</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>Building</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>15</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>Floor</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>8</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>Is verified</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>not verified</p>
                        </div>
                        <div className="col-6 col-lg-3 title">
                            <p>responsible admin</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <p>none</p>
                        </div>
                    </div>

                    <div className="outerDiv">
                        <h2>business's comercial register images</h2>
                        <div className="images">
                            <img src={image1} onClick={displayImgPreview} />
                            <img src={image2} onClick={displayImgPreview} />
                            <img src={image3} onClick={displayImgPreview} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="businessPreview-orders">
                    <h2 className="businessPreview-orders_title mt-4">Business' orders</h2>
                    <Table striped bordered hover className="mb-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Products</th>
                                <th>Total price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>15/1/2020</td>
                                <td>
                                    <Link to="/admin/products/id">name</Link>
                                    <Link to="/admin/products/id">name</Link>
                                </td>
                                <td>200 LE</td>
                                <td>Delivered</td>
                                <td>
                                    <Link to="/admin/orders/id">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>17/1/2020</td>
                                <td>
                                    <Link to="/admin/products/id">name</Link>
                                </td>
                                <td>75 LE</td>
                                <td>On its way</td>
                                <td>
                                    <Link to="/admin/orders/id">View</Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <hr />
                <div className="businessPreview-products mb-5">
                    <h2 className="businessPreview-products_title">Business' products</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Product name</th>
                                <th>Price</th>
                                <th>Rate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>15/1/2020</td>
                                <td>name</td>
                                <td>20 LE</td>
                                <td>
                                    <Rate rate={3} />
                                </td>
                                <td>
                                    <Link to="/admin/products/id">View</Link>
                                </td>
                            </tr>
                            <tr>
                             r   <td>1</td>
                                <td>22/3/2020</td>
                                <td>name</td>
                                <td>280 LE</td>
                                <td>
                                    <Rate rate={5} />
                                </td>
                                <td>
                                    <Link to="/admin/products/id">View</Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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
