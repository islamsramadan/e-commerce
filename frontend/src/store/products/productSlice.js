import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const res = await fetch('http://localhost:8080/products');
        const data = res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        },
        [getProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isError = true;
            state.message = action.payload;
        },
    },
});

export default productSlice.reducer;
