import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { FcStatistics } from 'react-icons/fc';
import { FaUsers } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiMoneyStack } from 'react-icons/gi';
import { RiAdminLine } from 'react-icons/ri';

import './sideNav.scss';

export default function AdminSideNav() {
    return (
        <Nav className="adminSideNav">
            <p>LOGO</p>
            <p>
                welcome <span> Moemen</span>
            </p>
            <Nav.Item>
                <NavLink to="statistics" activeclassname="active">
                    <FcStatistics />
                    Statistics
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="customers" activeclassname="active">
                    <FaUsers />
                    Customers
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="business" activeclassname="active">
                    <FaUsers />
                    Business
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="products" activeclassname="active">
                    <MdProductionQuantityLimits />
                    Products
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="orders" activeclassname="active">
                    <TbTruckDelivery />
                    Orders
                </NavLink>
            </Nav.Item>
            {/* <Nav.Item>
                <NavLink to="earning" activeclassname="active">
                    <GiMoneyStack />
                    Earnings
                </NavLink>
            </Nav.Item> */}
            <Nav.Item>
                <NavLink to="admins" activeclassname="active">
                    <RiAdminLine />
                    Admins
                </NavLink>
            </Nav.Item>

            <button>
                <BiLogOut />
                logout
            </button>
        </Nav>
    );
}
