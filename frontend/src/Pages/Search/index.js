import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { VscSettings } from 'react-icons/vsc';

import ProductCard from '../../components/ProductCard';
import Filter from '../../components/Filter';
import './search.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts, getSearchProducts } from '../../store/products/productSlice';

export default function SearchPage() {
    const { products } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getProducts());
    //
    // }, [dispatch]);
    console.log(products);

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
                {/* <div className="d-none d-lg-block">
                    <Filter></Filter>
                </div> */}

                {products?.length > 0 ? (
                    <div className="productsListDiv">
                        {products.map((product) => {
                            return <ProductCard key={product._id} product={product} />;
                        })}
                    </div>
                ) : (
                    <div className="w-50 mx-auto my-5 text-center">
                        <h5>No results for your product search</h5>
                        <h6>Try checking your spelling or use more general terms</h6>
                    </div>
                )}
            </div>
        </>
    );
}
