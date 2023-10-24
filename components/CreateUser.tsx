import { useRouter } from "next/navigation";
import { use, useState } from "react";

type Props = {
    setNewUser: (id: string, name: string, email: string, birthDay: string, phone: string, address: string) => void
}

export const CreateUser = ({ setNewUser }: Props) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDay, setBirthDay] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    return (
        <div className="flex flex-col max-w-[400px] gap-2 mb-4">
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <span>id</span>
                <input onChange={event => setId(event.target.value)} className="border-2 border-bg-gray-400px-2 py-1 rounded-md w-[240px]" type="text" id="id" name="userId" />
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <span>name</span>
                <input onChange={event => setName(event.target.value)} className="border-2 border-bg-gray-400px-2 py-1 rounded-md w-[240px]" type="text" id="name" name="name" />
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <span>email</span>
                <input onChange={event => setEmail(event.target.value)} className="border-2 border-bg-gray-400	px-2 py-1 rounded-md w-[240px]" type="email" id="email" name="email" />
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <span>birthDay</span>
                <input onChange={event => setBirthDay(event.target.value)} className="border-2 border-bg-gray-400	px-2 py-1 rounded-md w-[240px]" type="text" id="birthDay" name="birthDay" />
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <span>phone</span>
                <input onChange={event => setPhone(event.target.value)} className="border-2 border-bg-gray-400	px-2 py-1 rounded-md w-[240px]" type="text" id="phone" name="phone" />
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <span>address</span>
                <input onChange={event => setAddress(event.target.value)} className="border-2 border-bg-gray-400	px-2 py-1 rounded-md w-[240px]" type="text" id="address" name="address" />
            </div>
            <button onClick={() => {
                setNewUser(id, name, email, birthDay, phone, address)
            }}
                className="py-1 px-2 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-white rounded-lg duration-300">
                PUT
            </button>
        </div>
    )
}


