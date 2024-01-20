'use server'

import { Role } from "@/app/_lib/userConstants"
import CanDoModel from "@/types/canDoModel"
import { revalidateTag } from "next/cache"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Users`

export const canUserUpdateRole = async (id: string, role: Role) => {
  const res = await fetch(`${baseUrl}/${id}/can-update-role?role=${role}`, {
    cache: 'no-store'
  })

  const result = (await res.json()) as CanDoModel
  return result
}

export const updateUserRole = async (id: string, role: Role, updatedBy: string) => {
  const res = await fetch(`${baseUrl}/${id}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      role,
      updatedBy,
    })
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  revalidateTag('users')
}