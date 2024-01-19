import GetUsersModel from "@/types/getUsersModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Users`

export const loginUser = async (token: string) => {
  await fetch(`${baseUrl}/login`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getUsers = async (token: string) => {
  const res = await fetch(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    next: { tags: [`users`] }
  })

  const result = await res.json()
  return result as GetUsersModel
}