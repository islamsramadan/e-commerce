import React from 'react';
import Table from 'react-bootstrap/esm/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './customerPreview.scss';

export default function CustomerPreview() {
    return (
        <div className="customerPreview animate__animated animate__fadeIn">
            <div className="customerPreview-data">
                <h2 className="customerPreview-data_title">
                    Customer's data
                    <Button variant='danger'>Remove user</Button>
                </h2>
                <Table>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>fsjflksnfosf</td>
                            <td>Name</td>
                            <td>Moemen Said</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td>Email</td>
                            <td>Moemen@yahoo.com</td>
                            <td>Phone</td>
                            <td>01123356847</td>
                            <tr></tr>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>Alexandria</td>
                            <td>Street</td>
                            <td>gamal abd elnaser</td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td>Building</td>
                            <td>162</td>
                            <td>floor</td>
                            <td>8</td>
                        </tr>
                        <tr>
                            <td>Is verified</td>
                            <td>not verified</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <hr />
            <div className="customerPreview-orders">
                <h2 className="customerPreview-orders_title">Moemen's orders</h2>
                <Table striped bordered hover className="my-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Business</th>
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
                                <Link to="/admin/business/id">name</Link>
                                <Link to="/admin/business/id">name</Link>
                            </td>
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
                                <Link to="/admin/business/id">name</Link>
                            </td>
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
        </div>
    );
}
