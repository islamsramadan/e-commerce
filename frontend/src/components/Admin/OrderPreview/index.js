import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './orderPreview.scss';

export default function OrderPreview() {
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

                        <div className="col-12 col-lg-6 compositDiv">
                            <h4 className="compositDiv-title">Address</h4>
                            <Table className="w-auto">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>City</p>
                                        </td>
                                        <td>
                                            <p>Alex</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>Street</p>
                                        </td>
                                        <td>
                                            <p>lkvnl gjj ljrglerlkl</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>Building</p>
                                        </td>
                                        <td>
                                            <p>169</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>Floor</p>
                                        </td>
                                        <td>
                                            <p>8</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="col-12 col-lg-6 compositDiv">
                            <h4 className="compositDiv-title">Payment</h4>
                            <Table className="w-auto">
                                <tbody>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>Method</p>
                                        </td>
                                        <td>
                                            <p>Cash on delivery</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>Sub totals</p>
                                        </td>
                                        <td>
                                            <p>200 LE</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>Shiping price</p>
                                        </td>
                                        <td>
                                            <p>20 LE</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold">
                                            <p>total price</p>
                                        </td>
                                        <td>
                                            <p>220 LE</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <div className="row outerDiv data">
                        <div className="col-12 compositDiv">
                            <h3 className="compositDiv-title">Products</h3>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Business</th>
                                        <th>Unit price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <Link to="/admin/products/id">name</Link>
                                        </td>
                                        <td>2</td>
                                        <td>
                                            <Link to="/admin/products/id">name</Link>
                                        </td>
                                        <td>200 LE</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <Link to="/admin/products/id">name</Link>
                                        </td>
                                        <td>1</td>
                                        <td>
                                            <Link to="/admin/products/id">name</Link>
                                        </td>
                                        <td>75 LE</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <Button variant="primary" className='d-block my-5 mx-auto px-5 py-3'>Mark as delivered</Button>
                </div>
            </div>
        </>
    );
}
