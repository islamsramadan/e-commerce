import Spinner from '../../common/spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../store/auth/authSlice';
import { useEffect } from 'react';

const DashBoard = () => {
    const dispatch = useDispatch();

    const { products, isError, isLoading, isSuccess, message } = useSelector((state) => state.products);

    useEffect(() => {
        if (isError) {
            console.log('there is an error: ' + message);
        }
        if (isSuccess) {
            // navigate('/login');
            console.log(products);
        }
        // dispatch(reset());
    }, [products, isError, isSuccess, message]);

    console.log(products);
    return <h1>DashBoard</h1>;
};

export default DashBoard;
