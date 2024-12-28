import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as favoriteServices from '../../services/favoriteServices';



// Define a type for the slice state
interface WishlistState {
    status: string;
    totalPage: number;
    totalProduct: number;
    wishlist: any[];
}

// Define the initial state using that type
const initialState: WishlistState = {
    status: 'idle',
    totalPage: 0,
    totalProduct: 0,
    wishlist: []
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(getWishlist.pending, (state, action) => {
            state.status = 'loading';
        })
            .addCase(getWishlist.fulfilled, (state, action: PayloadAction<any>) => {
                state.wishlist = action.payload.result;
                state.totalPage = action.payload.totalPage;
                state.totalProduct = action.payload.totalProduct;
                state.status = 'idle'

            })
            .addCase(deleteWishlistItem.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteWishlistItem.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(postWishlistItem.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(postWishlistItem.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.wishlist.push(action.payload);
                state.totalProduct++;
                state.totalPage = Math.ceil(state.totalProduct / 6);

            }).addCase(putWishlistItem.pending, (state, action) => {
                state.status = 'loading';
            }).addCase(putWishlistItem.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.wishlist = state.wishlist.map(item => item.favoriteId === action.payload.favoriteId ? action.payload : item)
            })
    }
})

// Other code such as selectors can use the imported `RootState` type
// export const selectWishlist = (state: RootState) => state.wishlists.wishlist

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async (data: any) => {
    const res = await favoriteServices.getFavoriteByUserId(
        data.id,
        data.currentPage,
        data.limit
    );
    return res;

})

export const deleteWishlistItem = createAsyncThunk('wishlist/deleteWishlistItem', async (data: any) => {
    const res = await favoriteServices.deleteFavorite(data);
    if (res.status === "OK") {
        return data;
    }
})

export const postWishlistItem = createAsyncThunk('wishlist/postWishlistItem', async (data: any) => {
    const res = await favoriteServices.postFavorite(data);

    return {
        favoriteId: res.id,
        ...data
    }
})

export const putWishlistItem = createAsyncThunk('wishlist/putWishlistItem', async (data: any) => {
    const res = await favoriteServices.putFavorite(data);

    return {
        favoriteId: res.id,
        userId: res.user_id,
        productId: res.product_id,
        colorId: res.color_id,
        screenSizeId: res.screen_size_id,
        materialId: res.material_id,
    }
})

export default wishlistSlice.reducer


