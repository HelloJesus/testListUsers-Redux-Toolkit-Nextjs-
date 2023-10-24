"use client"
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "@/redux/services/usersApi"
import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from "@/redux/store";
import ReactPaginate from 'react-paginate';
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorMsg } from "@/components/ErrorMsg";
import { UserRows } from "@/components/UserRows";
import Link from "next/link";

type rangeUsers = {
  id: string;
  birthday_date: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
}[] | null

export default function Home() {
  const searchParams = useSearchParams()
  const offset = Number(searchParams.get('offset')) / 10

  const [itemOffset, setItemOffset] = useState(0)
  const [rangeUsers, setRangeUsers] = useState<any>()
  const [searchName, setSearchName] = useState<string>('')
  const router = useRouter()

  const { data: users } = useGetUsersQuery(null)

  const [updateUser, { data: updatedUser, error: updateUserError }] = useUpdateUserMutation()
  const [deleteUser, { data: deletedUser, error: deleteUserError }] = useDeleteUserMutation()
  const usersData = useAppSelector((state) => state.users)

  const currentUser = useAppSelector((state) => state.auth.user)
  const countPages = usersData && Math.ceil(usersData.users.length / 10) || 0

  useEffect(() => {
    if (usersData && usersData.users) {
      const prevOffset = itemOffset
      const nextOffset = itemOffset + 10

      const range = usersData.users.slice(prevOffset, nextOffset)

      setRangeUsers(range)
    }
  }, [itemOffset, usersData])

  // useEffect(() => {
  //   const filterUsers = usersData.users.filter(user => {
  //     if ((user.name).includes('Al')) return user
  //   })
  //   const prevOffset = itemOffset
  //   const nextOffset = itemOffset + 10

  //   const range = filterUsers.slice(prevOffset, nextOffset)
  //   setRangeUsers(range)
  // }, [searchName])

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 10)
    setItemOffset(newOffset)
    if (newOffset === 0) {
      router.push(`/`)
    } else {
      router.push(`?offset=${newOffset}`)

    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      {/* <button onClick={() => setSearchName('Al')}>search</button> */}
      <div className="mr-auto text-lg mb-4">{currentUser ? ( <div>User: currentUser</div> ) : ( <Link href='/login'>Login</Link> )}</div>
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
            <UserRows users={rangeUsers} updateUser={updateUser} deleteUser={deleteUser} />
          </tbody>
        </table>
        {countPages > 0 ?
          < ReactPaginate
            previousLinkClassName='text-sm py-2 px-2 mr-2 border-[1px] hover:bg-slate-200 cursor-pointer'
            nextLinkClassName='text-sm  py-2 px-2 ml-2 border-[1px] hover:bg-slate-200 cursor-pointer'
            activeLinkClassName='bg-slate-200'
            className='flex text-lg items-center mt-5 justify-center'
            pageLinkClassName='text-sm  py-2 px-3 border-[1px] hover:bg-slate-200 cursor-pointer'
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(usersData.users.length / 10)}
            previousLabel="previous"
            // renderOnZeroPageCount={null}
            initialPage={offset}
          />
          : ''
        }
      </div>
      <ErrorMsg delay={3000} usersError={deleteUserError} />
      <ErrorMsg delay={3000} usersError={updateUserError} />
    </main>
  )
}
