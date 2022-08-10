import React, { useEffect } from 'react';
import './Profile.style.scss';
import ProfileImg from '../../assets/images/3.webp';
import { AiOutlineMail } from 'react-icons/ai';
import EditForm from '../../components/EditForm/EditForm';
import { Button } from 'react-bootstrap';

import Spinner from '../../common/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CustomerSection = () => {
    return (
        <div className="col-12 col-lg-6">
            <p className="lead d-flex align-items-center">
                <AiOutlineMail className="me-2" />
                <span className="fw-semibold me-1 text-dark">email:</span> <span>ahmed.ibrahim@gmail.com</span>
            </p>
        </div>
    );
};

const Profile = () => {
    const [modalShow, setModalShow] = React.useState(false);

    const { user } = useSelector((state) => state.auth);

    const userData = user.user;

    return (
        <section className="profile-edit my-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="profile-edit-img d-flex flex-column align-items-center">
                            <img
                                className="rounded-circle custom-shadow mb-4"
                                width={200}
                                src={ProfileImg}
                                alt="profile image"
                            />
                            <div className=" file-input-container">
                                <label
                                    className="bg-primary  rounded-2 w-100 d-flex text-capitalize justify-content-center align-items-center text-white"
                                    htmlFor="profile"
                                >
                                    edit
                                </label>
                                <input id="profile" type="file" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="profile-edit-right bg-white rounded-2 p-4 custom-shadow">
                            <h2 className="text-capitalize mb-3">
                                {userData.role === 'customer'
                                    ? `${userData.name.firstname} ${userData.name.lastname}`
                                    : userData.name}
                            </h2>
                            <hr />
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">email:</span>{' '}
                                        <span>{userData.email}</span>
                                    </p>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">Address:</span>{' '}
                                        <span>{userData.address.city}</span>
                                    </p>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">role:</span>{' '}
                                        <span>{userData.role}</span>
                                    </p>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">phone:</span>{' '}
                                        <span>{userData.phone}</span>
                                    </p>
                                </div>
                                {userData.role === 'business' ? (
                                    <BusinessSection userData={userData} />
                                ) : (
                                    <CustomerSection />
                                )}
                            </div>
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                Edit Profile
                            </Button>
                            <EditForm show={modalShow} onHide={() => setModalShow(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const BusinessSection = ({ userData }) => {
    return (
        <>
            <div className="col-12 col-lg-6">
                <p className="lead d-flex align-items-center">
                    <span className="fw-semibold me-1 text-dark">verification:</span>{' '}
                    <span>{userData.isVerified ? 'verified' : 'Not verified yet'}</span>
                </p>
            </div>
            <div className="col-12 my-2">
                <p className="lead d-flex ">
                    <span className="fw-semibold me-1 text-dark">description:</span> <span>{userData.description}</span>
                </p>
            </div>
        </>
    );
};
export default Profile;
