import { configureStore } from '@reduxjs/toolkit';
import products from './products/productSlice';
import auth from './auth/authSlice';

const store = configureStore({
    reducer: {
        products,
        auth,
    },
});

export default store;
