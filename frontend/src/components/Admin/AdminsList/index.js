import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import './adminList.scss';
import { Button } from 'react-bootstrap';

export default function AdminsList() {
    return (
        <div className="adminsList animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-3">Admins</h1>
                </div>
                <div className="col-12">
                    <div className="d-flex w-100 my-4">
                        <div className="border border-warn rounded-2 p-2 me-2 flex-grow-1">
                            <h6>Filter</h6>
                            <Form.Control className="me-2" type="text" placeholder="Admin name" />
                        </div>
                        <Button>Add New </Button>
                    </div>
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Mark@yahoo.com</td>
                                <td>0123165465</td>
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
