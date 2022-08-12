import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    topRatedProducts: [],
    lastAddedProducts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// get all products
export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const res = await fetch('http://localhost:8080/products');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// get search products
export const getSearchProducts = createAsyncThunk('products/getSearchProducts', async (searchParameter, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:8080/search?q=${searchParameter}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

// get category products
export const getCategoryProducts = createAsyncThunk('products/getCategoryProducts', async (categoryId, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:8080/category/${categoryId}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

// get filter products
export const getFilterProducts = createAsyncThunk('products/getFilterProducts', async (categoryId, thunkApi) => {
    try {
        const res = await fetch(`http://localhost:8080/filterBy/${categoryId}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

// get top rated products
export const getTopRatedProducts = createAsyncThunk('products/getTopRatedProducts', async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const res = await fetch('http://localhost:8080/toprated');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// get last added products
export const getLastAddedProducts = createAsyncThunk('products/getLastAddedProducts', async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const res = await fetch('http://localhost:8080/lastAdded');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// // get one product
// export const getOneProduct = createAsyncThunk('products/getOneProduct', async (_, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//         const res = await fetch(`http://localhost:8080/products/${productID}`);
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// // create new product
// export const createProduct = createAsyncThunk('products/createProduct', async (product, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//         const token = thunkApi.getState().auth.user.token;
//         const res = await fetch('http://localhost:8080/products', {
//             method: 'POST',
//             body: JSON.stringify(product),
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

// // delete product
// export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productID, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//         const token = thunkApi.getState().auth.user.token;
//         const res = await fetch(`http://localhost:8080/products/${productID}`, {
//             method: 'DELETE',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         });
//         const data = await res.json();
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
// });

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
            state.products = action.payload.data;
        },
        [getProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.isError = true;
            state.message = action.payload;
        },
        // [getOneProduct.pending]: (state) => {
        //     state.isLoading = true;
        // },
        // [getOneProduct.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.products = action.payload.data;
        // },
        // [getOneProduct.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.products = [];
        //     state.isError = true;
        //     state.message = action.payload;
        // },
        // [createProduct.pending]: (state) => {
        //     state.isLoading = true;
        // },
        // [createProduct.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.products.push(action.payload);
        // },
        // [createProduct.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // },
        // [deleteProduct.pending]: (state) => {
        //     state.isLoading = true;
        // },
        // [deleteProduct.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.products = state.products.filter((product) => product._id !== action.payload.id);
        // },
        // [deleteProduct.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // },
        [getSearchProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getSearchProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload.matchingProducts;
        },
        [getSearchProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.isError = true;
            state.message = action.payload;
        },
        [getCategoryProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getCategoryProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload.data;
        },
        [getCategoryProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
        [getTopRatedProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getTopRatedProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.topRatedProducts = action.payload;
        },
        [getTopRatedProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
        [getLastAddedProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [getLastAddedProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.lastAddedProducts = action.payload.lastAdded;
        },
        [getLastAddedProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        },
    },
});

export default productSlice.reducer;
