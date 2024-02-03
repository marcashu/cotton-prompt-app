import GetUsersModel from "@/types/getUsersModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Users`

export const loginUser = async (token: string) => {
  const res = await fetch(`${baseUrl}/login`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const result = await res.json()
  return result as GetUsersModel
}

export const getRegisteredUsers = async () => {
  const res = await fetch(`${baseUrl}/registered`, {
    next: { tags: [`users`] },
  })

  const result = await res.json()
  return result as GetUsersModel[]
}