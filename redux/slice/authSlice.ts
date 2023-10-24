"use client"

import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { username } = action.payload;
            state.user = username
        },
        logOut: (state, action) => {
            state.user = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUser = (state: any) => {
    if (state?.auth?.user) return state.auth.user

    return null;
}

export default authSlice.reducer

