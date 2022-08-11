import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.style.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiCategoryAlt, BiCaretDown } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../../store/categories/categorySlice';

export default function NavbarComp() {
    return (
        <Navbar expand="lg" className="navbar-component bg-white">
            <Container>
                <Navbar.Brand className="category-dropdown">
                    <NavDropdown
                        title={
                            <div className="d-flex align-items-center justify-content-center">
                                <BiCategoryAlt />
                                <span className="d-block mx-2">Categories</span>
                                <IoIosArrowDown />
                            </div>
                        }
                        id="basic-nav-dropdown"
                    >
                        <Link
                            className="p-2 text-decoration-none text-black d-flex align-items-center category-item"
                            to="/"
                        >
                            <BiCategoryAlt />
                            <span className="ms-3 ">item</span>
                        </Link>

                        <Link
                            className="p-2 text-decoration-none text-black d-flex align-items-center category-item"
                            to="/"
                        >
                            <BiCategoryAlt />
                            <span className="ms-3 ">item</span>
                        </Link>

                        <Link
                            className="p-2 text-decoration-none text-black d-flex align-items-center category-item"
                            to="/"
                        >
                            <BiCategoryAlt />
                            <span className="ms-3 ">item</span>
                        </Link>

                        <Link
                            className="p-2 text-decoration-none text-black d-flex align-items-center category-item"
                            to="/"
                        >
                            <BiCategoryAlt />
                            <span className="ms-3 ">item</span>
                        </Link>
                    </NavDropdown>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
