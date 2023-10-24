import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setUser } from "../slice/userSlice"
import { setUsers, updateUsers } from "../slice/usersSlice"

type Users = {
    count: number
    next: string
    previous: any
    results: {
        id: string
        birthday_date: string
        name: string
        email: string
        phone_number: string
        address: string
    }[] | null
}

type User = {
    id: string
    birthday_date: string
    name: string
    email: string
    phone_number: string
    address: string
}


type UserUpdate = {
    id: string
    body: {
        email?: string
        birthday_date?: string
        name?: string
        phone_number?: string
        address?: string
    }
}

type UserCreate = {
    id: string
    name: string
    email: string
    birthday_date: string
    phone_number: string
    address: string
}

export const usersApi = createApi({
    reducerPath: "usersApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "https://technical-task-api.icapgroupgmbh.com/api/",
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<Users, number | null>({
            query: (offset = 0) => `table?limit=1000`,
            onQueryStarted: async(arg, api) => {
                const { dispatch, queryFulfilled } = api;
                const { data } = await queryFulfilled;
                dispatch(setUsers({users: data.results}))
            }
        }),
        getUser: builder.query<User, string | string[]>({
            query: (id) => `table/${id}`,
            onQueryStarted: async(arg, api) => {
                const { dispatch, queryFulfilled } = api;
                const { data } = await queryFulfilled;
                dispatch(setUser({user: data}))
            },
        }),
        createUser: builder.mutation<null, UserCreate>({
            query: (body) => ({
                url: `table/${body.id}/`,
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: body
            }),
            onQueryStarted: async(arg, api) => {
                const { dispatch, queryFulfilled } = api;
                const { data } = await queryFulfilled;
                dispatch(setUser({user: data}))
            },
        }),
        updateUser: builder.mutation<null, UserUpdate>({
            query: (req) => ({
                url: `table/${req.id}/`,
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: req.body
            }),
            onQueryStarted: async(arg, api) => {
                const { dispatch, queryFulfilled } = api;
                const { data } = await queryFulfilled;
                dispatch(setUser({user: data}))
                dispatch(updateUsers({user: data}))
            },
        }),
        deleteUser: builder.mutation<null, string>({
            query: (id) => ({
                url: `table/${id}/`,
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                }
            }),
        }),
        
    }),
})

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi
