import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import './adminPreview.scss';

export default function AdminPreview() {
    return (
        <div className="adminPreview">
            <h2 className="adminPreview-title">Admin's data</h2>

            <div className="row outerDiv data">
                <div className="col-6 col-lg-2 title">
                    <p>ID</p>
                </div>
                <div className="col-6 col-lg-4">
                    <p>fsjflksnfosf</p>
                </div>
                <div className="col-6 col-lg-2 title">
                    <p>Name</p>
                </div>
                <div className="col-6 col-lg-4">
                    <p>Moemen Said</p>
                </div>
                <div className="col-6 col-lg-2 title">
                    <p>Email</p>
                </div>
                <div className="col-6 col-lg-4">
                    <p>moemen@Yahoo.com</p>
                </div>
                <div className="col-6 col-lg-2 title">
                    <p>Phone</p>
                </div>
                <div className="col-6 col-lg-4">
                    <p>0123456789</p>
                </div>
            </div>

            <div className="outerDiv actions">
                <h4>admin's actions</h4>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>business</th>
                            <th>verified on</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <Link to="/admin/business/id">name</Link>
                            </td>
                            <td>20/5/2020</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                <Link to="/admin/business/id">name</Link>
                            </td>
                            <td>3/7/2021</td>
                        </tr>
                        
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
