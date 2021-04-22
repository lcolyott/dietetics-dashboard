import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user";

// Read more about Redux {@link https://redux.js.org/introduction/getting-started}
// Read more about configureStore {@link https://redux-toolkit.js.org/api/configureStore}
const store = configureStore({
    reducer: {
        userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;