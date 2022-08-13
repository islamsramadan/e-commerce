import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './businessProductEdit.scss';

export default function BusinessProductEdit() {
    let { id } = useParams();
    let [categories, setCategories] = useState([]);
    let [productData, setProductData] = useState({});
    let [images, setImages] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductData()
        loadCategories();
    },[])

    async function getProductData(){
        const res = await fetch(`http://localhost:8080/products/${id}`);
        const data = await res.json();
        setProductData(data.fullData);
    }

    async function loadCategories() {
        const res = await fetch('http://localhost:8080/categories');
        const data = await res.json();
        setCategories(data.data);
    }

    async function editProduct() {
        setProductData({ ...productData, businessId: sessionStorage.getItem('businessId') });
        delete productData.images;

        // adding product data
        let res = await fetch('http://localhost:8080/products', {
            method: 'PUT',
            body: JSON.stringify(productData),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
        });
        const productDataRes = await res.json();

        // if (productDataRes.success) {
        //     navigate(`/business/products/${id}`);
        // } else {
        //     alert('something went wrong please try again later')
        // }
    }

    return (
        <div className="businessProductAdd animate__animated animate__fadeIn">
            <div className="productPreview-data">
                <h2 className="productPreview-data_title my-5">Edit your Product</h2>
                <div className="outerDiv">
                    <Form className="row">
                        <Form.Group className="col-lg-6 mb-4">
                            <Form.Label>product name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                required
                                value={productData?.name}
                                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-4">
                            <Form.Label>product price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product price"
                                required
                                value={productData?.price}
                                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-4">
                            <Form.Label>product brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product brand"
                                required
                                value={productData?.brand}
                                onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-4">
                            <Form.Label>product count in stock</Form.Label>
                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="Enter product count"
                                required
                                value={productData?.countInStock}
                                onChange={(e) => setProductData({ ...productData, countInStock: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-4">
                            <Form.Select
                                aria-label="Choose category"
                                value={productData?.category}
                                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                                required
                            >
                                <option>Choose category</option>
                                {categories.map((category) => {
                                    return (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>product description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter product decription"
                                required
                                value={productData?.description}
                                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                            />
                        </Form.Group>

                        <div className="col-lg-12">
                            <Button variant="primary" onClick={editProduct} className="w-100 d-block">
                                Edit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
