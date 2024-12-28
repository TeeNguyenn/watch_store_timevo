import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import wishlistsReducer from '../components/Wishlist/wishlistSlice';
import cartReducer from '../layouts/components/Cart/cartSlice';
import customerInfoReducer from '../components/CustomerInfo/CustomerInfoSlice';

export const store = configureStore({
    reducer: {
        wishlists: wishlistsReducer,
        cartList: cartReducer,
        customerInfo: customerInfoReducer
    }
})

// Định nghĩa kiểu RootState và AppDispatch từ store của bạn
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Custom hook cho TypeScript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()