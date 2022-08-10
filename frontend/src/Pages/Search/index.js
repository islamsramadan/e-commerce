import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { VscSettings } from 'react-icons/vsc';

import ProductCard from '../../components/ProductCard';
import Filter from '../../components/Filter';
import './search.scss';

import Spinner from '../../common/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../store/products/productSlice';

export default function SearchPage() {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton className="pb-0">
                    <Offcanvas.Title className="d-flex align-items-center">Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <Filter></Filter>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="filterSortToggle d-lg-none">
                <button onClick={handleShow}>
                    <VscSettings />
                    Sort & Filter
                </button>
            </div>

            <div className="SearchPageContainer">
                <div className="d-none d-lg-block">
                    <Filter></Filter>
                </div>
                <div className="productsListDiv">
                    {products.map((product) => {
                        return <ProductCard key={product._id} product={product} />;
                    })}
                </div>
            </div>
        </>
    );
}
