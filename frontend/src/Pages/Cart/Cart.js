import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import './Cart.style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../store/cart/cartSlice';
import { useEffect } from 'react';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    // const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch, cartItems, totalPrice]);

    let totalItems = 0;
    for (let i = 0; i < cartItems.length; i++) {
        totalItems += cartItems[i].quantity;
    }

    return (
        <section className="cart-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="cart-items">
                            {cartItems.map((cartItem) => (
                                <CartItem
                                    key={cartItem.productId._id}
                                    product={cartItem.productId}
                                    quantity={cartItem.quantity}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-4 my-3 ">
                        <div className="order-summary bg-white rounded-2 custom-shadow p-2">
                            <h5>order summary</h5>
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span>Subtotal: {totalItems} item(s)</span>
                                <span>EGP {totalPrice}</span>
                            </p>
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span className="fw-semibold">total: {totalItems} item(s)</span>
                                <span className="fw-semibold">EGP {totalPrice}</span>
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
