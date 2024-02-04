'use server'

import { revalidateTag } from "next/cache"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/UserGroups`

export const createUserGroup = async (name: string, userIds: string[], createdBy: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      userIds,
      createdBy,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidateTag('userGroups')
}