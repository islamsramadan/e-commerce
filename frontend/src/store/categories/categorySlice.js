import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// get all categories
export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const res = await fetch('http://localhost:8080/categories');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.isLoading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.categories = action.payload.data;
        },
        [getCategories.rejected]: (state, action) => {
            state.isLoading = false;
            state.categories = [];
            state.isError = true;
            state.message = action.payload;
        },
    },
});

export default categorySlice.reducer;
