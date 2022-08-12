import './Cart.style.scss';
import ProdImg from '../../assets/images/3.webp';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { useDispatch } from 'react-redux';
import { incrementProduct, decrementProduct, removeFromCart } from '../../store/cart/cartSlice';

const CartItem = ({ product, quantity }) => {
    // console.log(product);
    const productId = { productId: product._id };

    const dispatch = useDispatch();
    const increamentHandel = (productId) => {
        dispatch(incrementProduct(productId));
    };

    const decreamentHandel = (productId) => {
        dispatch(decrementProduct(productId));
    };

    const removeFromCartHandel = (productId) => {
        dispatch(removeFromCart(productId));
    };

    return (
        <div className="cart-item bg-white p-3 rounded-2 my-3 custom-shadow">
            <div className="row">
                <div className="col-6 col-md-3">
                    <img src={ProdImg} alt="product image" className="w-100 h-100" />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                    <h5>{product.name}</h5>
                    <p>
                        sold by: <span className="fw-semibold">{product.businessId?.name}</span>
                    </p>
                    <button
                        onClick={() => removeFromCartHandel(productId)}
                        className="btn-delete btn btn-danger d-flex align-items-center justify-content-center"
                    >
                        <RiDeleteBin6Line className="me-1" /> delete
                    </button>
                </div>
                <div
                    className=" my-2 col-12 col-md-3 d-flex justify-content-between align-items-center flex-md-column 
                align-items-md-end justify-content-md-between
                "
                >
                    <h5 className="fw-semibold">{product.price}£ </h5>
                    <div className="d-flex quantity align-items-center">
                        <button
                            disabled={quantity == 1}
                            className="me-2 rounded-2 quantity-inc"
                            onClick={() => decreamentHandel(productId)}
                        >
                            -
                        </button>
                        {quantity}
                        <button
                            disabled={quantity >= product.countInStock}
                            className="ms-2 rounded-2 quantity-dec"
                            onClick={() => increamentHandel(productId)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
