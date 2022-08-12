import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalPrice: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// get user Cart
export const getCart = createAsyncThunk('cart/getCart', async (_, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user?.token;
        const res = await fetch('http://localhost:8080/customers/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = res.json();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

// add Product to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async (productId, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        const res = await fetch('http://localhost:8080/customers/cart', {
            method: 'POST',
            body: JSON.stringify(productId),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = res.json();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

// remove Product from Cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        const res = await fetch('http://localhost:8080/customers/cart', {
            method: 'DELETE',
            body: JSON.stringify(productId),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = res.json();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

// increment Product in Cart
export const incrementProduct = createAsyncThunk('cart/incrementProduct', async (productId, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        const res = await fetch('http://localhost:8080/customers/cart/increment', {
            method: 'PUT',
            body: JSON.stringify(productId),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = res.json();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

// decreament Product in Cart
export const decrementProduct = createAsyncThunk('cart/decrementProduct', async (productId, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        const res = await fetch('http://localhost:8080/customers/cart/decrement', {
            method: 'PUT',
            body: JSON.stringify(productId),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = res.json();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: {
        [getCart.pending]: (state) => {
            state.isLoading = true;
        },
        [getCart.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.cartItems = action.payload?.cart?.products;
            state.totalPrice = action.payload?.cart?.totalPrice;
        },
        [getCart.rejected]: (state, action) => {
            state.isLoading = false;
            state.orders = [];
            state.isError = true;
            state.message = action.payload;
        },
        [incrementProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [incrementProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [incrementProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
        [decrementProduct.pending]: (state) => {
            state.isLoading = true;
        },
        [decrementProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [decrementProduct.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
    },
});

export default cartSlice.reducer;
