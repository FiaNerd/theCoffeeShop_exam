import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { basketSlice } from '../components/basket/basketSlice';


export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;