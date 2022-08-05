import React from 'react';
import './Orders.style.scss';
import ProductImg from '../../assets/images/1.jpg';

const orders = [
    {
        date: '20/2/2022',
        status: 'delivered',
        totalPrice: 500,
        products: [
            { name: 'Laptop', price: 232, imgLink: '' },
            { name: 'Mouse', price: 300, imgLink: '' },
            { name: 'Cooler', price: 100, imgLink: '' },
        ],
    },
    {
        date: '20/2/2022',
        status: 'delivered',
        totalPrice: 500,
        products: [
            { name: 'Laptop', price: 232, imgLink: '' },
            { name: 'Mouse', price: 300, imgLink: '' },
            { name: 'Cooler', price: 100, imgLink: '' },
        ],
    },
    {
        date: '20/2/2022',
        status: 'pending',
        totalPrice: 500,
        products: [
            { name: 'Laptop', price: 232, imgLink: '' },
            { name: 'Mouse', price: 300, imgLink: '' },
            { name: 'Cooler', price: 100, imgLink: '' },
        ],
    },
];

const OrderItem = ({ order }) => {
    return (
        <div className="order-item">
            <div className="order-details flex-column flex-md-row d-flex">
                <p className="me-2 bg-primary text-white p-1 rounded-1">order date:{order.date}</p>
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
                    {order.products.map((product) => (
                        <ProductItem product={product} />
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
            <a href="#" className="product-item bg-white text-dark d-flex text-decoration-none">
                <img width="100" className="h-100" src={ProductImg} alt="product image" />
                <div className="product-details ms-2">
                    <h4>{product.name}</h4>
                    <h4>{product.price} $</h4>
                    <h4 className="mb-0">azn company</h4>
                </div>
            </a>
        </div>
    );
};

const Orders = () => {
    return (
        <section className="orders-section my-5">
            <div className="container">
                <div className="row">
                    {orders.map((order) => (
                        <OrderItem order={order} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Orders;