import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import './userList.scss';

export default function CustomersList() {
    return (
        <div className="cutomersList animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-3">Customers</h1>
                </div>
                <div className="col-12">
                    <spna>Filter</spna>
                    <FloatingLabel controlId="floatingInput" label="Customer name" className="mb-3">
                        <Form.Control type="text" placeholder="Customer name" />
                    </FloatingLabel>
                </div>
                <div className="col-12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>name</th>
                                <th>email</th>
                                <th>phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Mark@yahoo.com</td>
                                <td>0123165465</td>
                                <td>
                                    <Link to="id">View</Link>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Jacob@yahoo.com</td>
                                <td>0132416846</td>
                                <td>
                                    <Link to="id">View</Link>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
