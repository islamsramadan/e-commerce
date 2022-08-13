import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import './Cart.style.scss';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../store/cart/cartSlice';
import { useEffect } from 'react';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const [modalShow, setModalShow] = React.useState(false);

    const initialValues = {
        address: '',
        paymentMethod: '',
    };

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch, totalPrice]);

    let totalItems = 0;
    for (let i = 0; i < cartItems?.length; i++) {
        totalItems += cartItems[i].quantity;
    }

    return (
        <section className="cart-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="cart-items">
                            {cartItems?.map((cartItem) => (
                                <CartItem
                                    key={cartItem.productId._id}
                                    product={cartItem.productId}
                                    quantity={cartItem.quantity}
                                />
                            ))}
                            {cartItems?.length == 0 && (
                                <p className="fw-bold fs-2 text-center text-danger mt-5">you cart is empty </p>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 my-3 ">
                        <div className="order-summary bg-white rounded-2 custom-shadow p-4">
                            <h5>order summary</h5>
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span>Subtotal: {totalItems} item(s)</span>
                                <span>EGP {totalPrice}</span>
                            </p>
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span>shipping: {totalItems} </span>
                                <span>EGP {totalPrice != 0 && 30}</span>
                            </p>
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span className="fw-semibold">total: {totalItems} item(s)</span>
                                <span className="fw-semibold">EGP {totalPrice && totalPrice + 30}</span>
                            </p>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" onClick={() => setModalShow(true)}>
                                    Checkout
                                </Button>
                                <CheckoutModal show={modalShow} onHide={() => setModalShow(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
