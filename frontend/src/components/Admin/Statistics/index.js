import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiMoneyStack } from 'react-icons/gi';

import './statistics.scss';

export default function Statistics() {

    function getProductsCount(){
        try{
            fetch('https')
        }
        catch(err){

        }
    }

    return (
        <div className="statistics animate__animated animate__fadeIn">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-3">Statistics</h1>
                </div>

                <div className="col-12 col-md-6">
                    <div className="statistics-container">
                        <h4>
                            <FaUsers />
                            Users
                        </h4>
                        <div className="d-flex flex-wrap">
                            <div className="statistics-container_inner w-100">
                                <h6>Total</h6>
                                <h6>255</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>Customers</h6>
                                <h6>155</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>Business</h6>
                                <h6>100</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="statistics-container">
                        <h4>
                            <MdProductionQuantityLimits />
                            Products
                        </h4>
                        <div className="d-flex flex-wrap">
                            <div className="statistics-container_inner w-100">
                                <h6>Total</h6>
                                <h6>255</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>Available</h6>
                                <h6>155</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>Solded</h6>
                                <h6>100</h6>
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
                                <h6>Total</h6>
                                <h6>355</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>On delivery</h6>
                                <h6>155</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>Delivered</h6>
                                <h6>200</h6>
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
                                <h6>Total</h6>
                                <h6>300 £</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>business</h6>
                                <h6>100 £</h6>
                            </div>
                            <div className="statistics-container_inner flex-grow-1">
                                <h6>Deducted</h6>
                                <h6>200 £</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
