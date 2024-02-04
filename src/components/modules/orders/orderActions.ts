'use server'

import { revalidateTag } from "next/cache"
import { OrderFormValues } from "./form/OrderForm/orderFormSchema"

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

  revalidateTag(`orderId:${id}`)
  revalidateTag(`canClaim:${artistId}`)
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

  revalidateTag(`orderId:${id}`)
}

export const submitOrderDesign = async (id: number, design: string, fileName: string, artistId: string) => {
  const res = await fetch(`${baseUrl}/${id}/designs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      design,
      fileName,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidateTag(`orderId:${id}`)
  revalidateTag(`canClaim:${artistId}`)
}

export const approveOrder = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}/approve`, {
    method: "POST",
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidateTag(`orderId:${id}`)
}

export const updateOrder = async (value: OrderFormValues, updatedBy: string, id: number) => {
  const res = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...value,
      imageReferences: value.imageReferences?.map((ir) => ir.value),
      updatedBy,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidateTag(`orderId:${id}`)
}

export const createOrder = async (value: OrderFormValues, createdBy: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...value,
      imageReferences: value.imageReferences?.map((ir) => ir.value),
      createdBy,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }
}

export const deleteOrder = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error()
  }
}

export const acceptOrder = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}/accept`, {
    method: "POST",
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidateTag(`orderId:${id}`)
}

export const changeRequestOrder = async (id: number, designId: number, comment: string, imageReferences: string[]) => {
  const res = await fetch(`${baseUrl}/${id}/change-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      designId,
      comment,
      imageReferences,
    }),
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidateTag(`orderId:${id}`)
}