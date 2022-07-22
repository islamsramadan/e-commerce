import React from 'react';
import Form from 'react-bootstrap/Form';

import './filter.scss';

export default function Filter() {
  return (
    <div className="filter">
        <div className="filter-section">
        <h6>Category</h6>
        <div>
          <Form.Check label="category 1" />
          <Form.Check label="category 2" />
          <Form.Check label="category 3" />
          <Form.Check label="category 4" />
          <Form.Check label="category 5" />
        </div>
      </div>
      <div className="filter-section">
        <h6>Brand</h6>
        <div>
          <Form.Check label="brand 1" />
          <Form.Check label="brand 2" />
          <Form.Check label="brand 3" />
          <Form.Check label="brand 4" />
          <Form.Check label="brand 5" />
        </div>
      </div>
      <div className="filter-section">
        <h6>Seller</h6>
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
