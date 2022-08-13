import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import { Link, NavLink } from 'react-router-dom';
import '../Search/Search.style.css';
import NavbarComp from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/auth/authSlice';
import { getCart } from '../../../store/cart/cartSlice';
import { getSearchProducts } from '../../../store/products/productSlice';

export default function Search() {
    // const searchElement = document.querySelector('.search-element')?.value;
    // console.log(searchElement);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLocal = JSON.parse(localStorage.getItem('user'))?.user;
    const { cartItems } = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    let totalItems = 0;
    for (let i = 0; i < cartItems?.length; i++) {
        totalItems += cartItems[i].quantity;
    }

    const [text, setText] = useState('');
    const onSubmitHandel = (e) => {
        e.preventDefault();
        // console.log(text);
        dispatch(getSearchProducts(text));
        navigate('search');
        setText('');
    };

    return (
        <form onSubmit={onSubmitHandel} className="search bg-white custom-shadow">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-6 col-lg-2 order-1 order-lg-1">
                        <div className="logo width">
                            <Link to="/">
                                <h1>logo</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 order-3 order-lg-2">
                        {/* <h1
                            onClick={() => {
                                console.log(user?.user?.role);
                            }}
                        >
                            test
                        </h1> */}
                        <div className="my-2 search-box overflow-hidden d-flex align-items-center">
                            <i className="fa fa-search"></i>
                            <input
                                type="text"
                                value={text}
                                placeholder="Search your products"
                                onChange={(e) => setText(e.target.value)}
                            />
                            {/*<span className="d-none d-md-block">all categories</span>*/}
                        </div>
                    </div>
                    {/*navbar component */}
                    <div className="col-2 order-4 order-lg-3">
                        <NavbarComp />
                    </div>
                    <div className="col-6 col-lg-2 order-2 order-lg-4">
                        <div className="icon d-flex justify-content-end">
                            {userLocal ? (
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={<i className="fa fa-user user-icon"></i>}
                                    className="profile-button "
                                >
                                    <div className="d-flex flex-column">
                                        <NavLink
                                            className="p-2 text-black text-decoration-none text-decoration-none"
                                            to="/profile"
                                        >
                                            my profile
                                        </NavLink>
                                        <NavLink
                                            className="p-2 text-black text-decoration-none text-decoration-none"
                                            to="/orders"
                                        >
                                            orders
                                        </NavLink>

                                        {user?.user?.role == 'business' && (
                                            <NavLink
                                                className="p-2 text-black text-decoration-none text-decoration-none"
                                                to="/orders"
                                            >
                                                dashboard
                                            </NavLink>
                                        )}

                                        <DropdownItem
                                            onClick={() => {
                                                dispatch(logout());
                                            }}
                                            className="p-2"
                                        >
                                            logout
                                        </DropdownItem>
                                    </div>
                                </DropdownButton>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-primary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate('login');
                                        }}
                                    >
                                        login
                                    </button>
                                </>
                            )}
                            {userLocal?.role == 'customer' && (
                                <div className="cart">
                                    <Link to="/cart">
                                        <i className="fa fa-shopping-bag icon-circle"></i>
                                        <span className="d-flex justify-content-center align-items-center">
                                            {totalItems}
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
