"use client"
import { useCreateUserMutation, useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation, usersApi } from "@/redux/services/usersApi"
import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import UserRow from "@/components/UserRow";
import { CreateUser } from "@/components/CreateUser";
import { ErrorMsg } from "@/components/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
    const router = useRouter()
    const params = useParams()
    const userData = useAppSelector((state) => state.user.user)

    const { data: user } = useGetUserQuery(params.id)
    const [createUser, { data: createdUser, error: createUserError }] = useCreateUserMutation()
    const [updateUser, { data: updatedUser, error: updateUserError }] = useUpdateUserMutation()
    const [deleteUser, { data: deletedUser, error: deleteUserError }] = useDeleteUserMutation()

    const currentUser = useAppSelector((state) => state.auth.user)

    const setUpdateUser = (id: string, name: string, email: string, birthDay: string, phone: string, address: string) => {
        updateUser({ id, body: { name, email, birthday_date: birthDay, phone_number: phone, address } })
    }

    const setDeleteUser = (id: string) => {
        deleteUser(id)
    }

    const setNewUser = async (id: string, name: string, email: string, birthDay: string, phone: string, address: string) => {
        try {
            const res = await createUser({ id, name, email, birthday_date: birthDay, phone_number: phone, address })
            if (res && !('error' in res)) {
                router.push(`/${id}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="mr-auto text-lg mb-4">{currentUser ? ( <div>User: currentUser</div> ) : ( <Link href='/login'>Login</Link> )}</div>
            <CreateUser setNewUser={setNewUser} />
            <div>
                <table className="table-auto">
                    <thead className="bg-slate-200 ">
                        <tr>
                            <th className="px-2 py-2 rounded-l-md">id</th>
                            <th className="px-2">name</th>
                            <th className="px-2">birthday_date</th>
                            <th className="px-2">email</th>
                            <th className="px-2">phone_number</th>
                            <th className="px-2">address</th>
                            <th className="px-2 rounded-r-md">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.id ? <UserRow user={userData} setUpdateUser={setUpdateUser} setDeleteUser={setDeleteUser} /> : ''}
                    </tbody>
                </table>
            </div>
            <ErrorMsg delay={3000} usersError={createUserError} />
            <ErrorMsg delay={3000} usersError={deleteUserError} />
            <ErrorMsg delay={3000} usersError={updateUserError} />
        </main>
    )
}
