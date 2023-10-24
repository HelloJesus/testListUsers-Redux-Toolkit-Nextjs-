import { useCallback } from "react";
import UserRow from "./UserRow";

type Props = {
    users: {
      id: string;
      birthday_date: string;
      name: string;
      email: string;
      phone_number: string;
      address: string;
      limit?: number | undefined;
      offset?: number | undefined;
    }[] | null | undefined
    updateUser: any
    deleteUser: any
  }
  

export const UserRows = ({ users, updateUser, deleteUser }: Props) => {
    
    const setUpdateUser = useCallback((id: string, name: string, email: string, birthDay: string, phone: string, address: string) => {
      updateUser({ id, body: { name, email, birthday_date: birthDay, phone_number: phone, address } })
    }, [])
  
    const setDeleteUser = useCallback((id: string) => {
      deleteUser(id)
    }, [])
  
    if (users) {
      return users.map((user, index) => {
        if (!user?.id) return
        return (
          <UserRow key={user.id} user={user} setUpdateUser={setUpdateUser} setDeleteUser={setDeleteUser} />
        )
      })
    }
  }