'use server'

import Role from "@/enums/role"
import { mutate } from "@/helpers/fetchHelper"
import CanDoModel from "@/types/canDoModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Users`

export const canUserUpdateRole = async (id: string, roles: Role[]) => {
  const queryParam = !!roles.length ? `?roles=${roles.join(',')}` : ''
  const res = await fetch(`${baseUrl}/${id}/can-update-role${queryParam}`, {
    cache: 'no-store'
  })

  const result = (await res.json()) as CanDoModel
  return result
}

export const updateUserRole = async (id: string, updatedBy: string, roles: Role[]) => {
  await mutate(`${baseUrl}/${id}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      roles,
      updatedBy,
    })
  }, ['users'])
}

export const addUser = async (id: string, name: string, email: string, createdBy: string, roles: Role[]) => {
  await mutate(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      name,
      email,
      roles,
      createdBy,
    })
  }, ['users'])
}