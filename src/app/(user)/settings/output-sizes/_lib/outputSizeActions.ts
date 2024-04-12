'use server'

import { revalidatePath } from "next/cache"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/OutputSizes`

export const swapOutputSizes = async (id1: number, id2: number, userId: string) => {
  const res = await fetch(`${baseUrl}/swap`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id1,
      id2,
      userId,
    })
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/output-sizes')
}

export const updateOutputSizes = async (id: number, value: string, userId: string) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value,
      userId,
    })
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/output-sizes')
}

export const deleteOutputSize = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/output-sizes')
}

export const disableOutputSize = async (id: number, userId: string) => {
  const res = await fetch(`${baseUrl}/${id}/disable`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/output-sizes')
}

export const enableOutputSize = async (id: number, userId: string) => {
  const res = await fetch(`${baseUrl}/${id}/enable`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/output-sizes')
}

export const createOutputSize = async (value: string, userId: string) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value,
      userId,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/output-sizes')
}