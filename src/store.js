import { combineReducers, configureStore } from "@reduxjs/toolkit";
import layoutReducer from './features/layouterSlice'
import authReducer from './slicers/authSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage
}
const reducers = combineReducers({
    layout: layoutReducer,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store) 