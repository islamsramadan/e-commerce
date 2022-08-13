import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { FcStatistics } from 'react-icons/fc';
import { FaUsers } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { FiSettings } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';

import './businessSideNav.scss';

export default function BusinessSideNav() {
    const style = `
    form.search,footer.footer{
            display: none;
        }
`;

    return (
        <>
            <Nav className="adminSideNav">
            <p>LOGO</p>
            <p>
                welcome
            </p>
            <Nav.Item>
                <NavLink to="statistics" activeclassname="active">
                    <FcStatistics />
                    Statistics
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
                <NavLink to="admins" activeclassname="active">
                    <FiSettings />
                    Settings
                </NavLink>
            </Nav.Item> */}

            <button>
                <BiLogOut />
                logout
            </button>
        </Nav>
        </>
    );
}
