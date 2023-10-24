"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [{
        id: '',
        name: '',
        email: '',
        birthday_date: '',
        phone_number: '',
        address: ''
    }]
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            const { users } = action.payload;
            state.users = users
        },
        updateUsers: (state, action) => {
            const { user } = action.payload;
            return{
                users: [...state.users].map(userState => userState.id === user.id ? user : userState)
            }
        }
    }
})

export const { setUsers, updateUsers } = usersSlice.actions


export default usersSlice.reducer

