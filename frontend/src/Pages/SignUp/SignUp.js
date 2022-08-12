import React, { useState, useEffec, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../common/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../store/auth/authSlice';
import Loader from '../../common/Loader/Loader';

const initialValues = {
    email: 'o@gm.com',
    phone: '01282848843',
    password: '12345678',
    confirmPassword: '12345678',
    city: 'Alex',
    street: 'sre',
    building: 'da',
    floor: '3',
    role: '',
    name: 'Apple',
    description: 'lorem',
    firstname: 'Apple',
    lastname: 'tech Compny',
    imgLink: '',
    comRegImgLink: '',
};

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
    firstname: Yup.string().required('this field is required'),
    lastname: Yup.string().required('this field is required'),
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

                <div className="form-group col-12 col-md-6 my-3">
                    <label htmlFor="profileImg">Upload your profile image</label>
                    <input
                        onChange={(e) => {
                            props.setFieldValue('imgLink', e.target.files[0]);
                        }}
                        type="file"
                        name="imgLink"
                        className="form-control"
                        id="profileImg"
                        placeholder="upload img"
                    />
                    <p className="text-danger">
                        <ErrorMessage name="imgLink" />
                    </p>
                </div>
                <div className="form-group col-12 col-md-6 my-3">
                    <label htmlFor="comRegImgLink">Upload your registeration image</label>
                    <input
                        type="file"
                        name="comRegImgLink"
                        className="form-control"
                        id="comRegImgLink"
                        placeholder="upload img"
                        onChange={(e) => {
                            props.setFieldValue('comRegImgLink', e.target.files[0]);
                        }}
                    />
                    <p className="text-danger">
                        <ErrorMessage name="comRegImgLink" />
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
                    <label htmlFor="firstname">first name</label>
                    <Field
                        type="text"
                        name="firstname"
                        className="form-control"
                        id="firstname"
                        placeholder="enter your first name"
                    />
                    <p className="text-danger">
                        <ErrorMessage name="firstname" />
                    </p>
                </div>
                <div className="form-group col-12 col-md-6 mt-3">
                    <label htmlFor="lastname">last name</label>
                    <Field
                        type="text"
                        name="lastname"
                        className="form-control"
                        id="lastname"
                        placeholder="enter your last name"
                    />
                    <p className="text-danger">
                        <ErrorMessage name="lastname" />
                    </p>
                </div>
            </div>
        </div>
    );
};

const SignUp = () => {
    const resetForm = (arr, props) => {
        arr.forEach((element) => {
            props.setFieldValue(element, '');
        });
    };

    //   handling validatoinSchema
    const [currentRole, setCurrentRole] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            console.log('there is an error: ' + message);
        }
        if (user?.success && user?.user) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch, navigate]);

    const onSubmit = (userData) => {
        let formData = new FormData();
        formData = { type: 'businessProfile', image: userData.imgLink };
        console.log('form data:', formData);
        dispatch(register({ userData, formData }));
    };

    if (isLoading) {
        return <Loader />;
    }
    return (
        <Formik
            validationSchema={
                currentRole == 'customer'
                    ? customerValidationSchema
                    : currentRole == 'business'
                    ? businessValidationSchema
                    : mainValidationSchema
            }
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {(props) => (
                <Form className="my-5">
                    <div className="container custom-shadow rounded-2 p-5 bg-white">
                        <div className="row">
                            <h1 className="text-center mb-4 fw-light">SignUp</h1>
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
                                <p className="text-danger fst-italic fw-semibold">
                                    {user?.success == false &&
                                        user?.message == 'this email exist on our data' &&
                                        'this email is already exist !'}
                                </p>
                            </div>
                            <div className="form-group col-12 col-md-6">
                                <label htmlFor="phone">phone</label>
                                <Field
                                    type="phone"
                                    name="phone"
                                    className="form-control"
                                    id="phone"
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
                                    id="password"
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
                                    id="confirmPassword"
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
                                <Field type="text" name="city" className="form-control" id="city" placeholder="city" />
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

                            <div className=" my-3 d-flex">
                                <div className="form-check me-3">
                                    <Field
                                        type="radio"
                                        onChange={(e) => {
                                            props.setFieldValue('role', e.target.value);
                                            setCurrentRole(e.target.value);
                                            const fieldsToClear = ['name', 'description', 'imgLink', 'comRegImgLink'];
                                            resetForm(fieldsToClear, props);
                                        }}
                                        className="form-check-input"
                                        name="role"
                                        value="customer"
                                        id="customer"
                                    />
                                    <label className="form-check-label" htmlFor="customer">
                                        customer
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Field
                                        type="radio"
                                        className="form-check-input"
                                        name="role"
                                        value="business"
                                        id="business"
                                        onChange={(e) => {
                                            setCurrentRole(e.target.value);
                                            props.setFieldValue('role', e.target.value);

                                            resetForm(['firstname', 'lastname'], props);
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="business">
                                        business
                                    </label>
                                </div>
                            </div>
                            <p className="text-danger">
                                <ErrorMessage name="role" />
                            </p>

                            {props.values.role == 'business' ? (
                                <BusinessForm props={props} />
                            ) : (
                                props.values.role == 'customer' && <CustomerForm />
                            )}

                            <div className=" justify-content-center row">
                                <button
                                    type="submit"
                                    className=" col-12 col-md-2 btn btn-primary"
                                    disabled={
                                        // JSON.stringify(props.touched) == '{}' || JSON.stringify(props.errors) !== '{}'
                                        (props.dirty && !props.isValid) || !props.dirty
                                        // @Jasmine
                                    }
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SignUp;
