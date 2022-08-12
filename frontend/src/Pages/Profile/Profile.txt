import React, { useEffect, useState } from 'react';
import './Profile.style.scss';
import ProfileImg from '../../assets/images/3.webp';
import { AiFillFileText, AiOutlineMail } from 'react-icons/ai';
import EditForm from '../../components/EditForm/EditForm';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

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
    const { user } = useSelector((state) => state.auth.user);
    const [profileImg, setProfileImg] = useState();

    const handleChange = async (e) => {
        setProfileImg(e.target.files[0]);
        const formData = new FormData();
        formData.append('type', 'businessProfile');
        formData.append('image', e.target.files[0]);

        const res = await fetch(`http://localhost:8080/business/updateProfileImg/${user?._id}`, {
            method: 'PUT',
            body: formData,
        });

        const data = await res.json();
        console.log('response', data);
    };

    // useEffect(async () => {
    //     // console.log('profileImg:', profileImg);
    // }, [profileImg]);

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
                                {/*profile image --------------------------- */}
                                <input onChange={handleChange} id="profile" type="file" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <div className="profile-edit-right bg-white rounded-2 p-4 custom-shadow">
                            <h2
                                className="text-capitalize mb-3"
                                onClick={() => {
                                    console.log(user?.name?.firstname);
                                    console.log(user);
                                }}
                            >
                                {user?.role == 'customer'
                                    ? user?.name?.firstname + ' ' + user?.name?.lastname
                                    : user?.name}
                            </h2>
                            <hr />
                            <div className="row">
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">email:</span>{' '}
                                        <span>{user?.email}</span>
                                    </p>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">Address:</span>{' '}
                                        <span>
                                            {user?.address?.city}-{user?.address?.street}
                                        </span>
                                    </p>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">role:</span>{' '}
                                        <span>{user?.role}</span>
                                    </p>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <p className="lead d-flex align-items-center">
                                        <span className="fw-semibold me-1 text-dark">phone:</span>{' '}
                                        <span>{user?.phone}</span>
                                    </p>
                                </div>
                                {user?.role == 'business' && <BusinessSection user={user} />}
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

const BusinessSection = ({ user }) => {
    return (
        <>
            <div className="col-12 col-lg-6">
                <p className="lead d-flex align-items-center">
                    <span className="fw-semibold me-1 text-dark">verification:</span>{' '}
                    <span className={`${user?.isVerified ? 'text-success' : 'text-danger'} fw-bold `}>
                        {user?.isVerified ? 'verified' : 'not verified'}
                    </span>
                </p>
            </div>
            <div className="col-12 my-2">
                <p className="lead d-flex ">
                    <span className="fw-semibold me-1 text-dark">description:</span> <span>{user?.description}</span>
                </p>
            </div>
        </>
    );
};
export default Profile;
