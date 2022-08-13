import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Rate from '../../Rate';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import'./businessOrders.scss';

export default function BusinessOrders(){
    // let [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     loadBusinessProducts();
    // }, []);

    // async function loadBusinessOrders() {
    //     const res = await fetch(`http://localhost:8080//myorders/${localStorage.getItem('businessId')}`);
    //     const data = await res.json();
    //     setProducts(data.data);
    //     console.log(data);
    // }

    // return (
    //     <div className="ordersList animate__animated animate__fadeIn">
    //         <div className="row">
    //             <div className="col-12">
    //                 <h1 className="text-center my-3">Your Products</h1>
    //             </div>
    //             <div className="col-12">
    //                 {/* <div className="border border-warn rounded-2 p-2 my-2 ">
    //                     { <div className="border border-warn rounded-2 p-2 m-2 flex-grow-1">
    //                         <h6>Filter</h6>
    //                         <div className="d-flex">
    //                             <Form className="d-flex w-100 justify-content-center">
    //                                 <Form.Control className="w-100 me-2" type="text" placeholder="Product name" />
    //                                 <Button className="ms-3">Filter</Button>
    //                             </Form>
    //                         </div>
    //                     </div> }
    //                 </div> */}
    //                     <Link className="btn btn-primary align-self-center py-2 my-3 w-100" to="add">
    //                         Add
    //                     </Link>
    //             </div>
    //             <div className="col-12">
    //                 <Table striped bordered hover>
    //                     <thead>
    //                         <tr>
    //                             <th>#</th>
    //                             <th>Date</th>
    //                             <th>Name</th>
    //                             <th>Price</th>
    //                             <th>Rate</th>
    //                             <th></th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {products.map((product, index) => {
    //                             return (
    //                                 <tr key={product._id}>
    //                                     <td>{index+1}</td>
    //                                     <td>{product.createdAt}</td>
    //                                     <td>{product.name}</td>
    //                                     <td>{product.price}</td>
    //                                     <td>
    //                                         <Rate rate={product.rating} />
    //                                     </td>
    //                                     <td>
    //                                         <Link to={'/business/products/' + product._id}> View </Link>
    //                                     </td>
    //                                 </tr>
    //                             );
    //                         })}
    //                     </tbody>
    //                 </Table>
    //             </div>
    //         </div>
    //     </div>
    // );
}