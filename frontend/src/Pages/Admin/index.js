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
import './admin.scss'

export default function AdminPage() {
    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="col-12 col-lg-3 col-xl-2 g-0">
                    <AdminSideNav />
                </div>
                <div className="col-12 col-lg-9 col-xl-10">
                    <Routes>
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="customers" element={<CustomersList />} />
                        <Route path="business" element={<BusinessList />} />
                        <Route path="orders" element={<OrdersList />} />
                        <Route path="products" element={<Products />} />
                        <Route path="admins" element={<AdminsList />} />
                        <Route path="earning" element={< EarningList/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
