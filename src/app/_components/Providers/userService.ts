const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Users`

export const loginUser = async (accessToken: string) => {
  await fetch(`${baseUrl}/login`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}