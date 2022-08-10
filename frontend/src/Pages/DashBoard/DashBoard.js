import Spinner from '../../common/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../store/products/productSlice';
import { useEffect } from 'react';

const DashBoard = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { products, isError, isLoading, isSuccess, message } = useSelector((state) => state.products);

    useEffect(() => {
        if (isError) {
            console.log('there is an error: ' + message);
        }
        if (isSuccess) {
            // navigate('/login');
            console.log(products);
        }
        dispatch(getProducts());
    }, []);

    const cartProduct = products.filter((product) => product._id === '62e54aae1ad424c2334e86d0');
    console.log(cartProduct);
    console.log(products);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <h1>Products</h1>
            {products.map((product) => (
                <h3 key={product._id}>{product.name}</h3>
            ))}
        </>
    );
};

export default DashBoard;
