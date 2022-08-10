import './Cart.style.scss';
import ProdImg from '../../assets/images/3.webp';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/products/productSlice';
import { useEffect } from 'react';
import Spinner from '../../common/spinner/spinner';

const CartItem = ({ productID }) => {
    // console.log(productID);
    const dispatch = useDispatch();
    const { products, isLoading, isSuccess, isError } = useSelector((state) => state.products);
    useEffect(() => {
        if (isError) {
            console.log('error');
        }
        if (isSuccess) {
            console.log(products);
        }
        dispatch(getProducts());
    }, []);

    const getCartProduct = (ProductId) => {
        const cartProduct = products.length > 0 && products.filter((product) => product._id == ProductId);
        // console.log(cartProduct);
        return cartProduct[0];
    };
    console.log(products);
    const product = getCartProduct(productID);
    console.log(product);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="cart-item bg-white p-3 rounded-2 my-3 custom-shadow">
            <div className="row">
                <div className="col-6 col-md-3">
                    <img src={ProdImg} alt="product image" className="w-100 h-100" />
                </div>
                <div className="col-6 d-flex flex-column justify-content-center">
                    {/* <h5>{product.name}</h5> */}
                    <p>
                        sold by: <span className="fw-semibold">Addidas</span>
                    </p>
                    <button className="btn-delete btn btn-danger d-flex align-items-center justify-content-center">
                        <RiDeleteBin6Line className="me-1" /> delete
                    </button>
                </div>
                <div
                    className=" my-2 col-12 col-md-3 d-flex justify-content-between align-items-center flex-md-column 
                align-items-md-end justify-content-md-between
                "
                >
                    {/* <h5 className="fw-semibold">{product[0].price} $</h5> */}
                    <div className="d-flex quantity align-items-center">
                        <button className="me-2 rounded-2 quantity-inc">-</button>
                        {5}
                        <button className="ms-2 rounded-2 quantity-dec">+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
