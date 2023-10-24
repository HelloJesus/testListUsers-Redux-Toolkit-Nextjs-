"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: '',
        name: '',
        email: '',
        birthday_date: '',
        phone_number: '',
        address: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user } = action.payload;
            state.user = user
        }
    }
})

export const { setUser } = userSlice.actions


export default userSlice.reducer

