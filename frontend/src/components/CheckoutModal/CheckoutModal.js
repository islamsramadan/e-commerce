import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffec, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile } from '../../store/profile/profileSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import Loader from '../../common/Loader/Loader';
import { getOrders, addOrders, resetSuccess } from '../../store/orders/orderSlice';

const initialValues = {
    city: '',
    street: '',
    building: '',
    floor: '',
    paymentMethod: '',
};

const schema = Yup.object({
    city: Yup.string().required(),
    street: Yup.string().required(),
    building: Yup.string().required(),
    floor: Yup.string().required(),
    paymentMethod: Yup.string().required(),
});

const CheckoutMoal = (props) => {
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const { orders, isError, isSuccess, isLoading, message, back, counter } = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const localUser = JSON.parse(localStorage.getItem('user')).user;
    const navigate = useNavigate();

    useEffect(() => {}, [dispatch, cartItems, isError, isSuccess, isLoading]);

    console.log('local storage:', localUser);
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={schema}
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        // console.log('values:', values);
                        dispatch(addOrders({ values, cartItems, totalPrice }));
                        navigate('/orders');
                    }}
                >
                    {(props) => (
                        <Form className="p-2 p-md-4">
                            <h5 className="fw-semibold text-capitalize mb-4 text-start">
                                total price: <span className="text-danger">{totalPrice + 30}£</span>
                            </h5>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log('isSuccess', isSuccess);
                                    console.log('isSuccess', cartItems);
                                }}
                            >
                                show success
                            </button>
                            <div className="row">
                                <div className="form-group col-12 col-md-3">
                                    <label className="fw-semibold" htmlFor="city">
                                        city
                                    </label>
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
                                <div className="form-group col-12 col-md-3">
                                    <label className="fw-semibold" htmlFor="street">
                                        street
                                    </label>
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
                                <div className="form-group col-12 col-md-3">
                                    <label className="fw-semibold" htmlFor="building">
                                        building
                                    </label>
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
                                <div className="form-group col-12 col-md-3">
                                    <label className="fw-semibold" htmlFor="floor">
                                        floor
                                    </label>
                                    <Field
                                        type="text"
                                        name="floor"
                                        className="form-control"
                                        id="floor"
                                        placeholder="floor"
                                    />
                                    <p className="text-danger">
                                        <ErrorMessage name="floor" />
                                    </p>
                                </div>
                            </div>
                            {/* payment method */}
                            <div className="d-flex align-items-center">
                                <p className="fw-semibold m-0 me-2">payment method: </p>
                                <div className="form-check me-3">
                                    <Field
                                        type="radio"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="Paypal"
                                        id="paypal"
                                    />
                                    <label className=" form-check-label" htmlFor="paypal">
                                        paypal
                                    </label>
                                </div>
                                <div className="form-check d-flex align-items-center">
                                    <Field
                                        type="radio"
                                        className="form-check-input"
                                        name="paymentMethod"
                                        value="COD"
                                        id="deliver"
                                    />
                                    <label className="ms-1 form-check-label" htmlFor="deliver">
                                        Cash on delivery
                                    </label>
                                </div>
                            </div>
                            <div className="text-end mt-4">
                                <Button
                                    disabled={(props.dirty && !props.isValid) || !props.dirty || !cartItems?.length}
                                    type="submit"
                                    variant="success"
                                >
                                    confirm checkout
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default CheckoutMoal;
