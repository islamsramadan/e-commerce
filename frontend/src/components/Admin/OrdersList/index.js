import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import './ordersList.scss';

export default function OrdersList() {
    return (
        <div className="ordersList animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-3">Orders</h1>
                </div>
                <div className="col-12">
                    <div className="border border-warn rounded-2 p-2 my-2">
                        <h6>Filter</h6>
                        <div className="d-flex">
                            <Form className="d-flex w-100 justify-content-center">
                                <Form.Control className="w-25 me-2" type="text" placeholder="Customer name" />
                                <Form.Control className="w-25 me-2" type="email" placeholder="Customer email" />
                                <Form.Control className="w-25" type="text" placeholder="Business name" />
                                <Button className="ms-3">Filter</Button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Business</th>
                                <th>Products</th>
                                <th>Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>15/1/2020</td>
                                <td>
                                    <Link to="/admin/customers/id">name</Link>
                                </td>
                                <td>
                                    <Link to="/admin/business/id">name</Link>
                                    <Link to="/admin/business/id">name</Link>
                                </td>
                                <td>
                                    <Link to="/admin/products/id">name</Link>
                                    <Link to="/admin/products/id">name</Link>
                                </td>
                                <td>200 LE</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>17/1/2020</td>
                                <td>
                                    <Link to="/admin/customers/id">name</Link>
                                </td>
                                <td>
                                    <Link to="/admin/business/id">name</Link>
                                </td>
                                <td>
                                    <Link to="/admin/products/id">name</Link>
                                </td>
                                <td>75 LE</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
