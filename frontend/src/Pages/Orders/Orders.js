import React from 'react';
import './Orders.style.scss';
import ProductImg from '../../assets/images/1.jpg';

import Spinner from '../../common/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../store/orders/orderSlice';
import { useEffect } from 'react';

// const orders = [
//     {
//         date: '20/2/2022',
//         status: 'delivered',
//         totalPrice: 500,
//         products: [
//             { name: 'Laptop', price: 232, imgLink: '' },
//             { name: 'Mouse', price: 300, imgLink: '' },
//             { name: 'Cooler', price: 100, imgLink: '' },
//         ],
//     },
//     {
//         date: '20/2/2022',
//         status: 'delivered',
//         totalPrice: 500,
//         products: [
//             { name: 'Laptop', price: 232, imgLink: '' },
//             { name: 'Mouse', price: 300, imgLink: '' },
//             { name: 'Cooler', price: 100, imgLink: '' },
//         ],
//     },
//     {
//         date: '20/2/2022',
//         status: 'pending',
//         totalPrice: 500,
//         products: [
//             { name: 'Laptop', price: 232, imgLink: '' },
//             { name: 'Mouse', price: 300, imgLink: '' },
//             { name: 'Cooler', price: 100, imgLink: '' },
//         ],
//     },
// ];

const OrderItem = ({ order }) => {
    return (
        <div className="order-item">
            <div className="order-details flex-column flex-md-row d-flex">
                <p className="me-2 bg-primary text-white p-1 rounded-1">
                    order date:{order.createdAt ? order.createdAt.split('T')[0] : ''}
                </p>
                <p
                    className={`me-2 text-white p-1 rounded-1 
                ${order.status == 'delivered' ? 'bg-success' : 'bg-warning'}
                `}
                >
                    order status:{order.status}
                </p>
                <p className="me-2 text-white p-1 rounded-1 bg-info">order total price:{order.totalPrice}$</p>
            </div>
            <div className="order-products">
                <div className="row">
                    {order.orderItems.map((item) => (
                        <ProductItem key={item.productId} item={item} />
                    ))}
                </div>
            </div>
            <hr />
        </div>
    );
};

const ProductItem = ({ item }) => {
    return (
        <div className="col-12 col-md-3  rounded-2">
            <a href="#" className="product-item bg-white text-dark d-flex text-decoration-none">
                <img width="100" className="h-100" src={ProductImg} alt="product image" />
                <div className="product-details ms-2">
                    <h4>{item.name}</h4>
                    <h4>{item.unitPrice} $</h4>
                    <h4 className="mb-0">{item.businessId.name ? item.businessId.name : 'Random Company'}</h4>
                </div>
            </a>
        </div>
    );
};

const ShowOrders = () => {
    const dispatch = useDispatch();

    const { orders, isError, isLoading, isSuccess, message } = useSelector((state) => state.orders);

    useEffect(() => {
        if (isError) {
            console.log('there is an error: ' + message);
        }
        dispatch(getOrders());
    }, []);
    console.log(orders);
    return (
        <section className="orders-section my-5">
            <div className="container">
                <div className="row">
                    {orders.map((order) => (
                        <OrderItem key={order._id} order={order} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShowOrders;
