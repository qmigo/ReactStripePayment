import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/slice/cartSlice'
import authReducer from '@/slice/authSlice'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const authPersistConfig = {
    key: 'auth',
    storage
}


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: persistReducer(authPersistConfig, authReducer)
    },
    middleware: [thunk]
})

export const persistor = persistStore(store)


