import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
        const data = res.json();
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
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
