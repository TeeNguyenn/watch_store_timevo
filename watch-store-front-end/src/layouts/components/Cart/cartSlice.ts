import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as  cartItemServices from '../../../services/cartItemServices';
import * as  productServices from '../../../services/productServices';

interface CartState {
    status: string;
    cart: any[];
    subtotal: number;
}

const initialState: CartState = {
    status: 'idle',
    cart: [],
    subtotal: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCart.pending, (state, action) => {
            state.status = 'loading';
        }).addCase(getCart.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.cart = action.payload.cart;
            state.subtotal = action.payload.subtotal
        }).addCase(postCart.pending, (state, action) => { state.status = 'loading' })
            .addCase(postCart.fulfilled, (state, action) => {
                state.status = 'fulfilled';
            }).addCase(postCart.rejected, (state, action) => {
                state.status = 'rejected';
            })
            .addCase(deleteCart.pending, (state, action) => {
                state.status = 'loading'
            }).addCase(deleteCart.fulfilled, (state, action) => {
                state.status = 'fulfilled'
            })
    }
})


export const getCart = createAsyncThunk('cart/getCart', async () => {
    const res = await cartItemServices.getCartItemByUserId();

    let result = 0;
    const fetchApi = async (cartItem: any) => {
        const responseData = await productServices.getProductById(
            cartItem.product_id
        );

        if (responseData.discount) {
            result =
                result +
                responseData.price *
                (1 - responseData.discount / 100) *
                cartItem.quantity;
        } else {
            result =
                result +
                responseData.price * cartItem.quantity;
        }
    }

    const handleFetch = async (res: any) => {
        for (const cartItem of res) {
            await fetchApi(cartItem);
        }
    };

    await handleFetch(res);

    return {
        cart: res.reverse(),
        subtotal: result
    };
})

export const postCart = createAsyncThunk('cart/postCart', async (data: any) => {
    const currentUser = localStorage.getItem('user_id');
    const resData = await cartItemServices.getCartItemByUserId();

    const cartItem = resData.find(
        (item: any) =>
            item.product_id === data.productId &&
            item.color_id === data.colorId &&
            item.screen_size_id === data.screenSizeId &&
            item.material_id === data.materialId
    );

    if (cartItem) {
        const res = await cartItemServices.putCartItem({
            productId: data.productId,
            colorId: data.colorId,
            screenSizeId: data.screenSizeId,
            materialId: data.materialId,
            quantity: data.quantity || cartItem.quantity + 1,
            id: cartItem.id,
        });

    } else {
        const res = await cartItemServices.postCartItem({
            user_id: currentUser,
            product_id: data.productId,
            color_id: data.colorId,
            screen_size_id: data.screenSizeId,
            material_id: data.materialId,
            quantity: data.quantity || 1,
        });


    }
})


export const deleteCart = createAsyncThunk('cart/deleteCart', async (data: any) => {
    const res = await cartItemServices.deleteCartItem({
        userId: data.userId,
        productId: data.productId,
        colorId: data.colorId,
        screenSizeId: data.screenSizeId,
        materialId: data.materialId,
    });
})

export const deleteCartByUserId = createAsyncThunk('cart/deleteCartByUserId', async () => {
    const res = await cartItemServices.deleteCartItemByUserId();
})

export default cartSlice.reducer;