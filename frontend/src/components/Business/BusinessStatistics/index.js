import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiMoneyStack } from 'react-icons/gi';

import './businessStatistics.scss';

export default function BusinessStatistics() {
    let [statistics, setStatistics] = useState(null);

    useEffect(() => {
        getBusinessStatistics();
    }, []);

    async function getBusinessStatistics() {
        let userData = JSON.parse(localStorage.getItem('user'))
        console.log(userData.user._id);
        const res = await fetch(
            `http://localhost:8080/getStatistics-business/${userData.user._id}`
        );
        const data = await res.json();
        setStatistics(data);
        console.log(data);
    }

    return (
        <div className="statistics animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-3">Your Statistics</h1>
                </div>

                <div className="col-12 col-md-6">
                    <div className="statistics-container">
                        <h4>
                            <MdProductionQuantityLimits />
                            Available Products
                        </h4>
                        <div className="d-flex flex-wrap">
                            <div className="statistics-container_inner w-100">
                                <h6>{statistics?.productCount}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="statistics-container">
                        <h4>
                            <TbTruckDelivery />
                            Orders
                        </h4>
                        <div className="d-flex flex-wrap">
                            <div className="statistics-container_inner w-100">
                                <h6>{statistics?.numOfSoldProducts}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="statistics-container">
                        <h4>
                            <GiMoneyStack />
                            Earning
                        </h4>
                        <div className="d-flex flex-wrap">
                            <div className="statistics-container_inner w-100">
                                <h6>{ statistics?.balance || 0}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
