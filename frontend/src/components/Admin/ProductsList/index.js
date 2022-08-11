import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import Rate from '../../Rate'
import './products.scss';

export default function Products() {
    return (
        <div className="ordersList animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-3">Products</h1>
                </div>
                <div className="col-12">
                    <div className="border border-warn rounded-2 p-2 my-2">
                        <h6>Filter</h6>
                        <div className="d-flex">
                            <Form className="d-flex w-100 justify-content-center">
                                <Form.Control className="w-25 me-2" type="text" placeholder="Product name" />
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
                                <th>Name</th>
                                <th>Business</th>
                                <th>Price</th>
                                <th>Rate</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>15/1/2020</td>
                                <td>
                                    name
                                </td>
                                <td>
                                    <Link to="/admin/business/id">name</Link>
                                </td>
                                <td>
                                    20 LE
                                </td>
                                <td>
                                    <Rate rate={3}/>
                                </td>
                                <td><Link to="/admin/products/id">View</Link></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>22/3/2020</td>
                                <td>
                                    name
                                </td>
                                <td>
                                    <Link to="/admin/business/id">name</Link>
                                </td>
                                <td>
                                    280 LE
                                </td>
                                <td>
                                    <Rate rate={5}/>
                                </td>
                                <td><Link to="/admin/products/id">View</Link></td>

                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
