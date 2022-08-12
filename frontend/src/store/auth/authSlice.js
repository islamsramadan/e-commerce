import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useLocation } from 'react-router-dom';

const userLocal = JSON.parse(localStorage.getItem('user'));
// if(localStorage)

const initialState = {
    user: userLocal ? userLocal : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

//register
export const register = createAsyncThunk('auth/register', async (user, thunkApi) => {
    try {
        const res = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            body: JSON.stringify(user.userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log(`user data:`, data);
        // business
        if (user.userData.role == 'business') {
            // profile picture
            const profileImgRes = await fetch(`http://localhost:8080/business/updateProfileImg/${data?.userId}`, {
                method: 'POST',
                body: user.pofileFormData,
            });
            //const profileImgData = await profileImgRes.json();

            const comercialImgsRes = await fetch(`http://localhost:8080/business/uploadComReg/${data?.userId}`, {
                method: 'POST',
                body: user.comercialFormData,
            });
            // const comercialImgsData = await profileImgRes.json();
        }

        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
    // console.log('form data :', user?.formData?.imgLink);
});

//login
export const login = createAsyncThunk('auth/login', async (user, thunkApi) => {
    try {
        const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if (data) {
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
        logout: (state) => {
            state.user = null;
            localStorage.clear();
            // console.log('logout action');
        },
    },
    extraReducers: {
        //register
        [register.pending]: (state) => {
            state.isLoading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isError = true;
            state.message = action.payload;
        },

        // login
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isError = true;
            state.message = action.payload;
        },
    },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
