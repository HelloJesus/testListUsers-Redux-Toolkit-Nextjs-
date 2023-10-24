"use client"
import React from 'react'
import { useLoginUserMutation } from "@/redux/services/authApi"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from '@/redux/slice/authSlice';
import { useAppSelector } from '@/redux/store';

const Login = () => {
  const [login, { isLoading, data, error }] = useLoginUserMutation();
  // const currentuser = useSelector(selectCurrentUser)
  const currentUser = useAppSelector((state) => state.auth.user)

  const router = useRouter()
  const dispatch = useDispatch()

  const loginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')?.toString() || ''
    const password = formData.get('password')?.toString() || ''
    try {
      const res = await login({ username, password })
      if (res) {
        dispatch(setCredentials({ username }))
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='max-w-[250px] m-auto'>
      <h4 className='text-center text-lg'>Sign in</h4>
      <form onSubmit={e => (loginForm(e))} className='p-3 bg-slate-200	rounded-lg mt-2'>
        <div className='flex flex-col'>
          <label htmlFor="username">Username</label>
          <input className='mt-1 py-1 px-1 rounded-md' type="text" id='username' name='username' />
        </div>
        <div className='flex flex-col mt-4'>
          <label htmlFor="password">Password</label>
          <input className='mt-1 py-1 px-1 rounded-md' type="password" id='password' name='password' />
        </div>
        <ErrorLogin error={error} />
        <button className='w-full bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white mt-4 py-2'>Sign in</button>
      </form>
    </div>
  )
}

const ErrorLogin = ({ error }: { error: FetchBaseQueryError | SerializedError | undefined }) => {
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.parse(JSON.stringify(error.data))

      if (errMsg.error === 'Invalid credentials.'){
        return (<p className='text-sm text-red-600 mt-1'>Incorrect login or password</p>)
      }
    } else {
      return ('')
    }
  }
}

export default Login;
