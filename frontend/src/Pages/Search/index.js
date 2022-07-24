import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { VscSettings } from 'react-icons/vsc';

import ProductCard from '../../components/ProductCard';
import Filter from '../../components/Filter';
import './search.scss';

export default function SearchPage() {
    // for development only
    const products = [];
    for (let i = 0; i < 20; i++) {
        products.push(i);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton className="pb-0">
                    <Offcanvas.Title className="d-flex align-items-center">
                        Filter
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <Filter></Filter>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="filterSortToggle d-lg-none">
                <button onClick={handleShow}>
                    <VscSettings/>
                    Sort & filter 
                </button>
            </div>

            <div className="SearchPageContainer">
                <div className="d-none d-lg-block">
                    <Filter></Filter>
                </div>
                <div className="productsListDiv">
                    {products.map((product) => {
                        return <ProductCard key={product} product={product} />;
                    })}
                </div>
            </div>
        </>
    );
}
