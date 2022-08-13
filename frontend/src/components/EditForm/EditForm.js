import './EditForm.style.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffec, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile } from '../../store/profile/profileSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import Loader from '../../common/Loader/Loader';

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
    email: Yup.string().required().email('invalid email format'),
    phone: Yup.string().required().length(11, 'should be 11 digits'),
    city: Yup.string().required(),
    street: Yup.string().required(),
    building: Yup.string().required(),
    floor: Yup.number(),
    name: Yup.string().required(),
    description: Yup.string().required(),
});
const customerValidationSchema = Yup.object({
    email: Yup.string().required().email('invalid email format'),
    phone: Yup.string().required().length(11, 'should be 11 digits'),
    city: Yup.string().required(),
    street: Yup.string().required(),
    building: Yup.string().required(),
    floor: Yup.number(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
});

const BusinessForm = ({ props }) => {
    return (
        <div className="business-form my-3">
            <div className="row">
                <div className="form-group col-12 col-md-6">
                    <label htmlFor="name">business name</label>
                    <Field
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Enter your business name"
                    />
                    <p className="text-danger">
                        <ErrorMessage name="name" />
                    </p>
                </div>
                <div className="form-group col-12 col-md-6">
                    <label htmlFor="description">Business Description</label>
                    <Field
                        type="text"
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Enter your business description"
                    />
                    <p className="text-danger">
                        <ErrorMessage name="description" />
                    </p>
                </div>
            </div>
        </div>
    );
};

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

const EditForm = (props) => {
    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        await dispatch(editProfile(values));
        // await window.location.reload();
        props.onHide();
    };
    const localUser = JSON.parse(localStorage.getItem('user')).user;
    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.profile);
    const userData = JSON.parse(localStorage.getItem('user')).user;
    const [profileState, setProfileState] = useState(userData);

    useEffect(() => {
        if (isError) {
            console.log('there is an error: ' + message);
        }
        if (isSuccess) {
            const userLocal = JSON.parse(localStorage.getItem('user'));

            if (userLocal.user.role == 'business') {
                userLocal.user.name = user?.roleData?.data?.name;
                userLocal.user.description = user?.roleData?.data?.description;
            } else if (userLocal.user.role == 'customer') {
                userLocal.user.firstName = user?.roleData?.data?.firsName;
                userLocal.user.firstName = user?.roleData?.data?.firstName;
            }

            localStorage.setItem('user', JSON.stringify(userLocal));
            for (let prop in user?.userData) {
                console.log('props:', prop);
                if (prop == 'city' || prop == 'floor' || prop == 'building' || prop == 'street') {
                    userLocal.user.address[prop] = user?.userData[prop];
                } else {
                    userLocal.user[prop] = user?.userData[prop];
                }
            }
            localStorage.setItem('user', JSON.stringify(userLocal));
            console.log('local strg user', userLocal);
            console.log(user);
        }
    }, [user, isError, isSuccess, message, dispatch]);

    const initialValues = {
        email: localUser.email,
        phone: localUser.phone,
        city: localUser.address.city,
        street: localUser.address.street,
        building: localUser.address.building,
        floor: localUser.address.floor,
        name: localUser.name,
        description: localUser.description,
        firstName: localUser.firstName || localUser.name.firstname,
        lastName: localUser.lastName || localUser.name.lastname,
    };

    // console.log('is loading:', isLoading);

    console.log('is loading:', isLoading);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={
                        profileState?.role == 'business' ? businessValidationSchema : customerValidationSchema
                    }
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
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
                                    {profileState?.role == 'customer' ? (
                                        <CustomerForm />
                                    ) : (
                                        <BusinessForm props={props} />
                                    )}
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
