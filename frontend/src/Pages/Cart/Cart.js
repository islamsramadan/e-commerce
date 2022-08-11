import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import './Cart.style.scss';

const cartItems = [
    { name: 'Laptop', price: 300, company: 'Apple', quantity: 2 },
    { name: 'Laptop', price: 300, company: 'Apple', quantity: 2 },
    { name: 'Laptop', price: 300, company: 'Apple', quantity: 2 },
];

const Cart = () => {
    return (
        <section className="cart-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="cart-items">
                            {cartItems.map((cartItem, index) => (
                                <CartItem cartItem={cartItem} key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 my-3 ">
                        <div className="order-summary bg-white rounded-2 custom-shadow p-2">
                            <h5>order summary</h5>
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span>Subtotal(1 item)</span>
                                <span>EGP 200</span>
                            </p>
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span className="fw-semibold">total(1 item)</span>
                                <span className="fw-semibold">EGP 200</span>
                            </p>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary">checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
