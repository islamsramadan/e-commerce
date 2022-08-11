import { configureStore } from '@reduxjs/toolkit';
import products from './products/productSlice';
import auth from './auth/authSlice';
import profile from './profile/profileSlice';

const store = configureStore({
    reducer: {
        products,
        auth,
        profile,
    },
});

export default store;
