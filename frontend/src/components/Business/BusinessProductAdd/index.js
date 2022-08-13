import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './businessProductAdd.scss';

export default function BusinessProductAdd() {
    let [categories, setCategories] = useState([]);
    let [productData, setProductData] = useState({
        name: '',
        description: '',
        brand: '',
        price: '',
        countInStock: 0,
        businessId: '',
        category: '',
    });
    let [images, setImages] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        const res = await fetch('http://localhost:8080/categories');
        const data = await res.json();
        setCategories(data.data);
    }

    async function addProduct() {
        let user= JSON.parse(localStorage.getItem('user'))
        setProductData({ ...productData, businessId: user.user._id});
        setImages(document.getElementById('image-file').files[0]);

        // adding product data
        let res = await fetch('http://localhost:8080/products', {
            method: 'POST',
            body: JSON.stringify(productData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const productDataRes = await res.json();

        //adding product images
        let formData = new FormData();
        formData.append('type', 'product');
        formData.append('image', images);
        console.log(images);

        res = await fetch(`http://localhost:8080/business/uploadComReg/${productDataRes.data._id}`, {
            method: 'POST',
            body: formData,
        });

        const imagesDataRes = await res.json();
        console.log(imagesDataRes);
        if (imagesDataRes.sucess) {
            navigate('/business/products/');
        } else {
            alert('something went wrong please try again later')
        }
    }

    return (
        <div className="businessProductAdd animate__animated animate__fadeIn">
            <div className="productPreview-data">
                <h2 className="productPreview-data_title my-5">Add New Product</h2>
                <div className="outerDiv">
                    <Form className="row">
                        <Form.Group className="col-lg-6 mb-4">
                            <Form.Label>product name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product name"
                                required
                                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-4">
                            <Form.Label>product price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product price"
                                required
                                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="col-lg-6 mb-4">
                            <Form.Label>product brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product brand"
                                required
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
                                onChange={(e) => setProductData({ ...productData, countInStock: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="col-lg-12 mb-4">
                            <Form.Select
                                aria-label="Choose category"
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
                                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Select product images</Form.Label>
                            <Form.Control type="file" id="image-file" accept="image/*" />
                        </Form.Group>

                        <div className="col-lg-12">
                            <Button variant="primary" onClick={addProduct} className="w-100 d-block">
                                Add
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
