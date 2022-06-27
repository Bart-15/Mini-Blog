import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers'
const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    initialState
})

export default store;