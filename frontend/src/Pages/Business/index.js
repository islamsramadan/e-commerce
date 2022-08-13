import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BusinessOrderPreview from '../../components/Business/BusinessOrderPreview';
import BusinessOrders from '../../components/Business/BusinessOrders';
import BusinessProductAdd from '../../components/Business/BusinessProductAdd';
import BusinessProductEdit from '../../components/Business/BusinessProductEdit';
import BusinessProductPreview from '../../components/Business/BusinessProductPreview';
import BusinessProducts from '../../components/Business/BusinessProducts';
import BusinessSettings from '../../components/Business/BusinessSettings';
import BusinessSideNav from '../../components/Business/BusinessSideNav';
import BusinessStatistics from '../../components/Business/BusinessStatistics';

import './business.scss';

export default function BusinessPage() {
    const style = `
        form.search,footer.footer{
                display: none;
            }
    `;

    return (
        <>
            <style>{style}</style>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-3 col-xl-2 g-0">
                        <BusinessSideNav />
                    </div>
                    <div className="col-12 col-lg-9 col-xl-10">
                        <Routes>
                            <Route path="statistics" element={<BusinessStatistics />} />
                            <Route path="orders" element={<BusinessOrders />} />
                            <Route path="orders/:id" element={<BusinessOrderPreview />} />
                            <Route path="products" element={<BusinessProducts />} />
                            <Route path="products/add" element={<BusinessProductAdd />} />
                            <Route path="products/edit/:id" element={<BusinessProductEdit />} />
                            <Route path="products/:id" element={<BusinessProductPreview />} />
                            <Route path="settings" element={<BusinessSettings />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}
