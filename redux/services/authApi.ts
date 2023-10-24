import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type AuthUser = {
    username: string
    password: string
}

export const authUserApi = createApi({
    reducerPath: "authUserApi",
    // refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: "https://technical-task-api.icapgroupgmbh.com/api/",
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<null, AuthUser>({
            query: (body) => ({
                url: "login/",
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body,
                // validateStatus: (response, result) =>
                //     response.status === 200 && !result.isError,
            }),
        }),
    }),
})

export const { useLoginUserMutation } = authUserApi
