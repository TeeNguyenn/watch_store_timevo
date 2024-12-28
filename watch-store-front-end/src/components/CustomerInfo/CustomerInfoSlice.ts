import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userServices from '../../services/userServices';

interface CartState {
    status: string;
    avatar: string;
}

const initialState: CartState = {
    status: 'idle',
    avatar: '',
}

export const CustomerInfoSlice = createSlice({
    name: 'customerInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(putAvatarCustomer.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(putAvatarCustomer.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.avatar = action.payload;
        })
    }
})


export const putAvatarCustomer = createAsyncThunk('customerInfo/putAvatarCustomer', async (data: string) => {
    return data;
})


export default CustomerInfoSlice.reducer;