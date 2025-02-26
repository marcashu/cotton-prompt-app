import { query } from "@/helpers/fetchHelper"
import GetUsersModel from "@/types/getUsersModel"
import axios from "axios"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Users`

export const loginUser = async (token: string) => {
  const result = await query<GetUsersModel>(`${baseUrl}/login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return result
}

export const getRegisteredUsers = async () => {
  const result = await axios.get<GetUsersModel[]>(`${baseUrl}/registered`)
  return result.data
}
