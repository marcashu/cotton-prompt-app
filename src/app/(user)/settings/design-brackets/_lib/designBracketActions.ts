'use server'

import { revalidatePath } from "next/cache"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/DesignBrackets`

export const swapDesignBrackets = async (id1: number, id2: number, userId: string) => {
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

  revalidatePath('/settings/design-brackets')
}

export const updateDesignBrackets = async (id: number, name: string, value: number, userId: string) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      value,
      userId,
    })
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/design-brackets')
}

export const deleteDesignBracket = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/design-brackets')
}

export const disableDesignBracket = async (id: number, userId: string) => {
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

  revalidatePath('/settings/design-brackets')
}

export const enableDesignBracket = async (id: number, userId: string) => {
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

  revalidatePath('/settings/design-brackets')
}

export const createDesignBracket = async (name: string, value: number, userId: string) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      value,
      userId,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/design-brackets')
}