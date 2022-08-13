import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminSideNav from '../../components/Admin/SideNav';
import CustomersList from '../../components/Admin/CustomersList';
import BusinessList from '../../components/Admin/BusinessList';
import OrdersList from '../../components/Admin/OrdersList';
import Statistics from '../../components/Admin/Statistics';
import Products from '../../components/Admin/ProductsList';
import AdminsList from '../../components/Admin/AdminsList';
import EarningList from '../../components/Admin/Earning';
import './admin.scss';
import CustomerPreview from '../../components/Admin/CustomerPreview';
import BusinessPreview from '../../components/Admin/BusinessPreview';
import ProductPreview from '../../components/Admin/ProductPreview';
import OrderPreview from '../../components/Admin/OrderPreview';
import AdminPreview from '../../components/Admin/AdminPreview';

export default function AdminPage() {
    const style = `
        form.search,footer.footer{
                display: none;
            }
    `;

    return (
        <div className="container-fluid dashboard">
            <style>{style}</style>
            <div className="row">
                <div className="col-12 col-lg-3 col-xl-2 g-0">
                    <AdminSideNav />
                </div>
                <div className="col-12 col-lg-9 col-xl-10">
                    <Routes>
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="customers" element={<CustomersList />} />
                        <Route path="customers/:id" element={<CustomerPreview />} />
                        <Route path="business" element={<BusinessList />} />
                        <Route path="business/:id" element={<BusinessPreview />} />
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="orders/:id" element={<OrderPreview />} />
                        <Route path="products" element={<Products />} />
                        <Route path="products/:id" element={<ProductPreview />} />
                        <Route path="admins" element={<AdminsList />} />
                        <Route path="admins/:id" element={<AdminPreview />} />
                        <Route path="earning" element={<EarningList />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
