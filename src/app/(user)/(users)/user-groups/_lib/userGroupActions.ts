'use server'

import { mutate } from "@/helpers/fetchHelper"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/UserGroups`

export const createUserGroup = async (name: string, userIds: string[], createdBy: string) => {
  await mutate(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      userIds,
      createdBy,
    }),
  }, ['userGroups'])
}

export const updateUserGroup = async (id: number, name: string, userIds: string[], updatedBy: string) => {
  await mutate(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      userIds,
      updatedBy,
    }),
  }, ['userGroups', `userGroup:${id}`])
}

export const removeUser = async (id: number, userId: string) => {
  await mutate(`${baseUrl}/${id}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }, ['userGroups', `userGroup:${id}`])
}

export const deleteUserGroup = async (id: number) => {
  await mutate(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }, ['userGroups'])
}