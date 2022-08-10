import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.style.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiCategoryAlt, BiCaretDown } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';

import Spinner from '../../spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../../store/categories/categorySlice';

export default function NavbarComp() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, []);
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
                        {categories.map((category) => {
                            return (
                                <NavDropdown.Item href="#action/3.1" key={category._id}>
                                    <BiCategoryAlt />
                                    <span className="ms-3 ">{category.name}</span>
                                </NavDropdown.Item>
                            );
                        })}

                        {/* <NavDropdown.Item href="#action/3.1">
              <Link
                className="text-decoration-none text-black d-flex align-items-center category-item"
                to="/"
              >
                <BiCategoryAlt />
                <span className="ms-3 ">item</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">
              <Link
                className="text-decoration-none text-black d-flex align-items-center category-item"
                to="/"
              >
                <BiCategoryAlt />
                <span className="ms-3 ">item</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">
              <Link
                className="text-decoration-none text-black d-flex align-items-center category-item"
                to="/"
              >
                <BiCategoryAlt />
                <span className="ms-3 ">item</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">
              <Link
                className="text-decoration-none text-black d-flex align-items-center category-item"
                to="/"
              >
                <BiCategoryAlt />
                <span className="ms-3 ">item</span>
              </Link>
            </NavDropdown.Item> */}
                    </NavDropdown>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
