import './EditForm.style.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffec, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

const mainValidationSchema = Yup.object({
    email: Yup.string().required('this field is required').email('invalid email format'),
    phone: Yup.string().required('this field is required').length(11, 'should be 11 digits'),
    password: Yup.string()
        .required('this field is required')
        .max(16, 'maximum passwrd is 8')
        .min(8, 'min digits are 8'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'password must match'),
    city: Yup.string().required('this field is required'),
    street: Yup.string().required('this field is required'),
    building: Yup.string().required('this field is required'),
    floor: Yup.number().required(),
    role: Yup.string().required('this field is required'),
});
const businessValidationSchema = Yup.object({
    email: Yup.string().required('this field is required').email('invalid email format'),
    phone: Yup.string().required('this field is required').length(11, 'should be 11 digits'),
    password: Yup.string()
        .required('this field is required')
        .max(16, 'maximum passwrd is 8')
        .min(8, 'min digits are 8'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'password must match'),
    city: Yup.string().required('this field is required'),
    street: Yup.string().required('this field is required'),
    building: Yup.string().required('this field is required'),
    floor: Yup.number().required(),
    role: Yup.string().required('this field is required'),
    name: Yup.string().required('this field is required'),
    description: Yup.string().required('this field is required'),
    imgLink: Yup.string().required('this field is required'),
    comRegImgLink: Yup.string().required('this field is required'),
});
const customerValidationSchema = Yup.object({
    email: Yup.string().required('this field is required').email('invalid email format'),
    phone: Yup.string().required('this field is required').length(11, 'should be 11 digits'),
    password: Yup.string()
        .required('this field is required')
        .max(16, 'maximum passwrd is 8')
        .min(8, 'min digits are 8'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'password must match'),
    city: Yup.string().required('this field is required'),
    street: Yup.string().required('this field is required'),
    building: Yup.string().required('this field is required'),
    floor: Yup.number().required('this field is required'),
    role: Yup.string().required('this field is required'),
    firstName: Yup.string().required('this field is required'),
    lastName: Yup.string().required('this field is required'),
});

const CustomerForm = () => {
    return (
        <div className="customer-form my-3">
            <div className="row">
                <div className="form-group col-12 col-md-6 mt-3">
                    <label htmlFor="firstName">first name</label>
                    <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="firstName"
                        placeholder="enter your first name"
                    />
                    <p className="text-danger">
                        <ErrorMessage name="firstName" />
                    </p>
                </div>
                <div className="form-group col-12 col-md-6 mt-3">
                    <label htmlFor="lastName">last name</label>
                    <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                        id="lastName"
                        placeholder="enter your last name"
                    />
                    <p className="text-danger">
                        <ErrorMessage name="lastName" />
                    </p>
                </div>
            </div>
        </div>
    );
};

const onSubmit = (values) => {
    console.log(values);
};

const EditForm = (props) => {
    const initialValues = {
        email: 'osama@gmail.com',
        phone: '01272848843',
        password: '',
        confirmPassword: '',
        city: 'Mallawi',
        street: 'sde-e23',
        building: '45eds',
        floor: '8',
        role: 'Customer',
        name: '',
        description: '',
        firstName: '',
        lastName: '',
        imgLink: '',
        comRegImgLink: '',
    };
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik validationSchema={businessValidationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                    {(props) => (
                        <Form className="">
                            <div className="container  rounded-2 px-5 bg-white">
                                <div className="row">
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="email">email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="email" />
                                        </p>
                                    </div>
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="phone">phone</label>
                                        <Field
                                            type="phone"
                                            name="phone"
                                            className="form-control"
                                            id="form"
                                            placeholder="Enter ur phone number"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="phone" />
                                        </p>
                                    </div>

                                    {/*password */}
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="password">password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            id="form"
                                            placeholder="enter password"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="password" />
                                        </p>
                                    </div>
                                    <div className="form-group col-12 col-md-6">
                                        <label htmlFor="confirmPassword">confirm password</label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control"
                                            id="form"
                                            placeholder="confirm password"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="confirmPassword" />
                                        </p>
                                    </div>

                                    {/*password */}

                                    {/*address */}
                                    <div className="form-group col-12 col-md-3 mt-3">
                                        <label htmlFor="city">city</label>
                                        <Field
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            id="city"
                                            placeholder="city"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="city" />
                                        </p>
                                    </div>

                                    <div className="form-group col-12 col-md-3 mt-3">
                                        <label htmlFor="street">street</label>
                                        <Field
                                            type="text"
                                            name="street"
                                            className="form-control"
                                            id="street"
                                            placeholder="street"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="street" />
                                        </p>
                                    </div>
                                    <div className="form-group col-12 col-md-3 mt-3">
                                        <label htmlFor="building">building</label>
                                        <Field
                                            type="text"
                                            name="building"
                                            className="form-control"
                                            id="building"
                                            placeholder="building"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="building" />
                                        </p>
                                    </div>
                                    <div className="form-group col-12 col-md-3 mt-3">
                                        <label htmlFor="floor">floor</label>
                                        <Field
                                            type="number"
                                            name="floor"
                                            className="form-control"
                                            id="floor"
                                            placeholder="floor"
                                        />
                                        <p className="text-danger">
                                            <ErrorMessage name="floor" />
                                        </p>
                                    </div>

                                    <p className="text-danger">
                                        <ErrorMessage name="role" />
                                    </p>
                                    <CustomerForm />
                                    <div className=" justify-content-center row">
                                        <button
                                            type="submit"
                                            className="w-50 btn btn-primary"
                                            disabled={
                                                // JSON.stringify(props.touched) == '{}' || JSON.stringify(props.errors) !== '{}'
                                                (props.dirty && !props.isValid) || !props.dirty
                                                // @Jasmine
                                            }
                                        >
                                            save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditForm;
