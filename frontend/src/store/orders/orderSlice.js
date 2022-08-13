import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const localUser = JSON.parse(localStorage.getItem('user'))?.user;

const initialState = {
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getOrders = createAsyncThunk('orders/getOrders', async (_, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token;
        const res = await fetch('http://localhost:8080/myorders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log('returned data: ', data);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const addOrders = createAsyncThunk('orders/getOrders', async ({ values, cartItems, totalPrice }, thunkApi) => {
    try {
        console.log('sent Data', values);
        console.log('sent Data', cartItems);
        const token = thunkApi.getState().auth.user.token;
        const res = await fetch('http://localhost:8080/orders', {
            method: 'POST',
            body: JSON.stringify({ ...values, shippingPrice: 30, cartItems, userId: localUser._id, totalPrice }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log('returned data:', data);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
    console.log(values);
    console.log(cartItems);
    return '';
});

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: {
        [getOrders.pending]: (state) => {
            state.isLoading = true;
        },
        [getOrders.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
        },
        [getOrders.rejected]: (state, action) => {
            state.isLoading = false;
            state.orders = [];
            state.isError = true;
            state.message = action.payload;
        },
    },
});

export default orderSlice.reducer;
