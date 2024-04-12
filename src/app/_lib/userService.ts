import { query } from "@/helpers/fetchHelper"
import GetUsersModel from "@/types/getUsersModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Users`

export const loginUser = async (token: string) => {
  const result = await query<GetUsersModel>(`${baseUrl}/login`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return result
}

export const getRegisteredUsers = async () => {
  const result = await query<GetUsersModel[]>(`${baseUrl}/registered`, {
    next: { tags: [`users`] },
  })
  return result
}