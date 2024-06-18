'use server'

import CanDoModel from "@/types/canDoModel"
import { OrderFormValues } from "./form/OrderForm/orderFormSchema"
import { mutate, queryMutate } from "@/helpers/fetchHelper"
import ImageReferenceModel from "@/types/imageReferenceModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`

export const assignArtistToOrder = async (id: number, artistId: string) => {
  const result = await queryMutate<CanDoModel>(`${baseUrl}/${id}/artist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artistId
    }),
    cache: 'no-store',
  }, [`orderId:${id}`, `canClaim:${artistId}`])

  return result
}

export const assignCheckerToOrder = async (id: number, checkerId: string) => {
  const result = await queryMutate<CanDoModel>(`${baseUrl}/${id}/checker`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checkerId
    }),
    cache: 'no-store',
  }, [`orderId:${id}`])

  return result
}

export const submitOrderDesign = async (id: number, design: string, fileName: string, artistId: string) => {
  await mutate(`${baseUrl}/${id}/designs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      design,
      fileName,
    }),
  }, [`orderId:${id}`, `canClaim:${artistId}`])
}

export const approveOrder = async (id: number) => {
  await mutate(`${baseUrl}/${id}/approve`, {
    method: "POST",
  }, [`orderId:${id}`])
}

export const updateOrder = async (value: OrderFormValues, updatedBy: string, id: number) => {
  await mutate(baseUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...value,
      updatedBy,
    }),
  }, [`orderId:${id}`])
}

export const createOrder = async (value: OrderFormValues, createdBy: string) => {
  await mutate(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...value,
      createdBy,
    }),
  })
}

export const deleteOrder = async (id: number) => {
  await mutate(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
}

export const acceptOrder = async (id: number) => {
  await mutate(`${baseUrl}/${id}/accept`, {
    method: "POST",
  }, [`orderId:${id}`])
}

export const changeRequestOrder = async (id: number, designId: number, comment: string, imageReferences: ImageReferenceModel[]) => {
  await mutate(`${baseUrl}/${id}/change-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      designId,
      comment,
      imageReferences,
    }),
  }, [`orderId:${id}`])
}

export const resendOrderForCustomerReview = async (id: number) => {
  await mutate(`${baseUrl}/${id}/resend-for-customer-review`, {
    method: "POST",
  })
}

export const reportOrder = async (id: number, reason: string, isRedraw: boolean) => {
  await mutate(`${baseUrl}/${id}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reason,
      isRedraw,
    }),
  }, [`orderId:${id}`])
}

export const resolveOrder = async (id: number, resolvedBy: string) => {
  await mutate(`${baseUrl}/${id}/resolve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resolvedBy,
    }),
  }, [`orderId:${id}`])
}

export const sendOrderForPrinting = async (id: number, userId: string) => {
  await mutate(`${baseUrl}/${id}/send-for-printing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),
  }, [`orderId:${id}`])
}