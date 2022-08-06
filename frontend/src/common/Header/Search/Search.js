import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import { Link } from 'react-router-dom';
import '../Search/Search.style.css';
import NavbarComp from '../Navbar/Navbar';

export default function Search() {
    const searchElement = document.querySelector('.search');
    window.addEventListener('scroll', () => {
        // searchElement.classList.toggle("active", window.screenY > 100);
    });
    return (
        <form className="search bg-white custom-shadow">
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
                        <div className="my-2 search-box overflow-hidden d-flex align-items-center">
                            <i className="fa fa-search"></i>
                            <input type="text" placeholder="Search for products" />
                            {/*<span className="d-none d-md-block">all categories</span>*/}
                        </div>
                    </div>
                    {/*navbar component */}
                    <div className="col-2 order-4 order-lg-3">
                        <NavbarComp />
                    </div>
                    <div className="col-6 col-lg-2 order-2 order-lg-4">
                        <div className="icon d-flex justify-content-end">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={<i className="fa fa-user user-icon"></i>}
                                className="profile-button"
                            >
                                <DropdownItem href="/profile">my profile</DropdownItem>
                                <DropdownItem href="/orders">orders</DropdownItem>
                                <DropdownItem href="#/action-3">Something else</DropdownItem>
                            </DropdownButton>
                            <div className="cart">
                                <a href="/cart">
                                    <i className="fa fa-shopping-bag icon-circle"></i>
                                    <span>5</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
