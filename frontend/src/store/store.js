import { configureStore } from '@reduxjs/toolkit';
import products from './products/productSlice';
import auth from './auth/authSlice';
import categories from './categories/categorySlice';
import orders from './orders/orderSlice';

const store = configureStore({
    reducer: {
        products,
        auth,
        categories,
        orders,
    },
});

export default store;
