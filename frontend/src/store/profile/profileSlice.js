import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'))?.user;
const initialState = {
    user: user || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const editProfile = createAsyncThunk('profile/editProfile', async (userData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const token = thunkApi.getState().auth.user.token;
        const userRes = await fetch('http://localhost:8080/users', {
            method: 'PUT',
            body: JSON.stringify({
                email: userData.email,
                city: userData.city,
                street: userData.street,
                building: userData.building,
                floor: userData.floor,
                phone: userData.phone,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const userdata = await userRes.json();

        let roleData;

        console.log('user role :', user.role);
        if (user.role == 'business') {
            const businessRes = await fetch('http://localhost:8080/business', {
                method: 'PUT',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            roleData = await businessRes.json();
        } else if (user.role == 'customer') {
            const customerRes = await fetch('http://localhost:8080/customer', {
                method: 'PUT',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            roleData = await customerRes.json();
        }
        console.log('role data =>', roleData);
        return { userData, roleData };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const profileSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [editProfile.pending]: (state) => {
            state.isLoading = true;
            console.log('loading ....');
        },
        [editProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        },
        [editProfile.rejected]: (state, action) => {
            state.isLoading = false;
            // state.user = null;
            state.isError = true;
            state.message = action.payload;
        },
    },
});

export default profileSlice.reducer;
