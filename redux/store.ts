import { configureStore } from "@reduxjs/toolkit"
import { usersApi } from "./services/usersApi"
import { authUserApi } from "./services/authApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import usersReducer from "./slice/usersSlice";

import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [authUserApi.reducerPath]: authUserApi.reducer,
        auth: authReducer,
        user: userReducer,
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([usersApi.middleware, authUserApi.middleware]),
        
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;