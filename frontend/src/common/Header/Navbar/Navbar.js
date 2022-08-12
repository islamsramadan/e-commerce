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
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { getCategories } from '../../../store/categories/categorySlice';
import { getCategoryProducts } from '../../../store/products/productSlice';

export default function NavbarComp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categories } = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    // console.log(categories);

    const onClickCategoryHandel = (categoryId) => {
        dispatch(getCategoryProducts(categoryId));
        console.log('category clicked');
    };
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
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                className="p-2 text-decoration-none text-black d-flex align-items-center category-item"
                                to="/search"
                                onClick={() => onClickCategoryHandel(category._id)}
                            >
                                <BiCategoryAlt />
                                <span className="ms-3 ">{category.name}</span>
                            </Link>
                        ))}
                    </NavDropdown>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
