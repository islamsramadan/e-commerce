import React from 'react';
import './Orders.style.scss';
import ProductImg from '../../assets/images/1.jpg';
import { useSelector, useDispatch } from 'react-redux';
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
        <div className="order-item custom-shadow bg-white  py-4 my-3">
            <div className="order-details flex-column flex-md-row d-flex">
                <p className="me-2 bg-primary text-white p-1 rounded-1">
                    order date: {order?.createdAt?.substr(0, 10)}
                </p>
                <p
                    className={`me-2 text-white p-1 rounded-1 
                    ${order.status == 'delivered' ? 'bg-success' : 'bg-warning'}
                    `}
                >
                    order status:{order?.status}
                </p>
                <p className="me-2 text-white p-1 rounded-1 bg-danger">order total price:{order.totalPrice}$</p>
                <p className="me-2 text-white p-1 rounded-1 bg-secondary">
                    address:{order?.address?.city + ' ' + order?.address?.street}
                </p>
            </div>
            <div className="order-products">
                <div className="row">
                    {order?.orderItems?.map((product) => (
                        <ProductItem key={product.productId} product={product} />
                    ))}
                </div>
            </div>
            <hr />
        </div>
    );
};

const ProductItem = ({ product }) => {
    return (
        <div className="col-12 col-md-3  rounded-2">
            <div className="h-100 product-item bg-white text-dark border d-flex text-decoration-none">
                <div>
                    <img width="100" className="h-100" src={ProductImg} alt="product image" />
                </div>
                <div className="product-details ms-2">
                    <h4>{product.name}</h4>
                    <h4>{product.unitPrice} $</h4>
                    <h4 className="mb-0">business name from back end </h4>
                </div>
            </a>
        </div>
    );
};

const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.orders);
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    // console.log(orders);
    return (
        <section className="orders-section my-5">
            <div className="container">
                {orders?.length > 0 ? (
                    <div className="row">
                        {orders.map((order) => (
                            <OrderItem key={order._id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="w-50 mx-auto my-5 text-center">
                        <h5>There is no orders yet</h5>
                        <h6>check our products and make order</h6>
                    </div>
                )}
            </div>
        </section>
    );
};
