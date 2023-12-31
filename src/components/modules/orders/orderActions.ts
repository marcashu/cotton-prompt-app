'use server'

import { revalidatePath } from "next/cache"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`

export const assignArtistToOrder = async (id: number, artistId: string) => {
  const res = await fetch(`${baseUrl}/${id}/artist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artistId
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath(`/orders/${id}/view`)
}

export const assignCheckerToOrder = async (id: number, checkerId: string) => {
  const res = await fetch(`${baseUrl}/${id}/checker`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checkerId
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath(`/orders/${id}/view`)
}