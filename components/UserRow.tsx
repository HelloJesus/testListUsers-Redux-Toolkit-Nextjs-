import Link from "next/link";
import { useState } from "react";

type Props = {
  user: {
    id: string
    birthday_date: string
    name: string
    email: string
    phone_number: string
    address: string
  }
  setUpdateUser: (id: string, name: string, email: string, birthDay: string, phone: string, address: string) => void
  setDeleteUser: (id: string) => void
}

const UserRow = ({ user, setUpdateUser, setDeleteUser }: Props) => {

  const [name, setName] = useState(user.name)
  const [birthDay, setBirthDay] = useState(user.birthday_date)
  const [phone, setPhone] = useState(user.phone_number)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(user.address)
  const [btnUpdate, setUpdateBtn] = useState<boolean>(false)

  return (
      <tr key={user.id} className="text-sm">
        <td className="px-2 py-2">{user.id}</td>
        <td className="px-2 py-2">
          {btnUpdate
            ?
            <input className="border-2 border-bg-gray-400	px-2 py-1 rounded-md"
              type="name" id="name" value={name} placeholder={name} onChange={(event: any) => setName(event.target.value)} />
            :
            <span>
              {user.name}
            </span>
          }
        </td>
        <td className="px-2 py-2">
          {btnUpdate
            ?
            <input className="border-2 border-bg-gray-400	px-2 py-1 rounded-md"
              type="birthday" id="birthDay" value={birthDay}
              placeholder={birthDay} onChange={(event: any) => setBirthDay(event.target.value)} />
            :
            <span>
              {user.birthday_date}
            </span>
          }
        </td>
        <td className="px-2 py-2">
          {btnUpdate
            ?
            <input className="border-2 border-bg-gray-400	px-2 py-1 rounded-md"
              type="email" id="email" value={email}
              placeholder={email} onChange={(event: any) => setEmail(event.target.value)} />
            :
            <span>
              {user.email}
            </span>
          }
        </td>
        <td className="px-2 py-2">
          {btnUpdate
            ?
            <input className="border-2 border-bg-gray-400	px-2 py-1 rounded-md"
              type="phone_number" id="phone_number" value={phone}
              placeholder={phone} onChange={(event: any) => setPhone(event.target.value)} />
            :
            <span>
              {user.phone_number}
            </span>
          }
        </td>
        <td className="px-2 py-2">
          {btnUpdate
            ?
            <input className="border-2 border-bg-gray-400	px-2 py-1 rounded-md"
              type="address" id="phone_numaddressber" value={address}
              placeholder={address} onChange={(event: any) => setAddress(event.target.value)} />
            :
            <span>
              {user.address}
            </span>
          }
        </td>
        <td className="flex gap-1">
          {btnUpdate
            ?
            (<div className="flex flex-row gap-2">
              <button className="py-1 px-2 border-2 border-sky-500
            rounded-md hover:bg-sky-500 hover:text-white duration-300" onClick={() => {
                  setUpdateBtn(false)
                  setUpdateUser(user.id, name, email, birthDay, phone, address)
                }}>
                Update
              </button>
              <button className="py-1 px-2 border-2 border-orange-500
            rounded-md hover:bg-orange-500 hover:text-white duration-300" onClick={() => setUpdateBtn(!btnUpdate)}>
                Close
              </button>
            </div>)
            :
            (<div className="flex gap-1">
              <button className="py-1 px-2 border-2 border-amber-500
          rounded-md hover:bg-amber-500 hover:text-white duration-300"
                onClick={() => setUpdateBtn(!btnUpdate)}>
                Change
              </button>
              <button className="py-1 px-2 border-2 border-red-500
          rounded-md hover:bg-red-500 hover:text-white duration-300"
                onClick={() => {
                  setDeleteUser(user.id)
                }}>
                Delete
              </button>
            </div>
            )
          }
          <Link className="py-1 px-2 border-2 border-blue-500
          rounded-md hover:bg-blue-500 hover:text-white duration-300" href={`/${user.id}`}>Link</Link>
        </td>
      </tr>
  )
}


export default UserRow