import { configureStore } from '@reduxjs/toolkit';
import products from './products/productSlice';
import auth from './auth/authSlice';
import categories from './categories/categorySlice';
import orders from './orders/orderSlice';
import cart from './cart/cartSlice';
import profile from './profile/profileSlice';

const store = configureStore({
    reducer: {
        products,
        auth,
        categories,
        orders,
        cart,
        profile,
    },
});

export default store;
