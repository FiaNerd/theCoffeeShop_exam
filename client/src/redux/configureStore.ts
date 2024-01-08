import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../components/account/accountSlice';
import { basketSlice } from '../components/basket/basketSlice';
import { productSlice } from '../components/product/productSlice';


export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
        product: productSlice.reducer,
        account: accountSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;