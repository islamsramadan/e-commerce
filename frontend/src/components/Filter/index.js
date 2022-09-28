import React from 'react';
import Form from 'react-bootstrap/Form';
import {BiCategoryAlt} from 'react-icons/bi'

import SortBy from '../SortBy';
import './filter.scss';

export default function Filter() {
    return (
        <div className="filter">
            <div className="filter-section">
                <SortBy></SortBy>
            </div>
            <div className="filter-section">
                <h6><BiCategoryAlt/> Category</h6>
                <div>
                    <Form.Check id="1" label="category 1"/>
                    <Form.Check id="2" label="category 2" />
                    <Form.Check id="3" label="category 3" />
                    <Form.Check id="4" label="category 4" />
                    <Form.Check id="5" label="category 5" />
                </div>
            </div>
            <div className="filter-section">
                <h6><BiCategoryAlt/> Brand</h6>
                <div>
                    <Form.Check label="brand 1" />
                    <Form.Check label="brand 2" />
                    <Form.Check label="brand 3" />
                    <Form.Check label="brand 4" />
                    <Form.Check label="brand 5" />
                </div>
            </div>
            <div className="filter-section">
                <h6><BiCategoryAlt/> Seller</h6>
                <div>
                    <Form.Check label="seller 1" />
                    <Form.Check label="seller 2" />
                    <Form.Check label="seller 3" />
                    <Form.Check label="seller 4" />
                    <Form.Check label="seller 5" />
                </div>
            </div>
        </div>
    );
}
