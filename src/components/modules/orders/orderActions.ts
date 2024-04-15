'use server'

import { OrderFormValues } from "./form/OrderForm/orderFormSchema"
import { mutate } from "@/helpers/fetchHelper"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`

export const assignArtistToOrder = async (id: number, artistId: string) => {
  await mutate(`${baseUrl}/${id}/artist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artistId
    }),
  }, [`orderId:${id}`, `canClaim:${artistId}`])
}

export const assignCheckerToOrder = async (id: number, checkerId: string) => {
  await mutate(`${baseUrl}/${id}/checker`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checkerId
    }),
  }, [`orderId:${id}`])
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
      imageReferences: value.imageReferences?.map((ir) => ir.value),
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
      imageReferences: value.imageReferences?.map((ir) => ir.value),
      createdBy,
    }),
  })
}

export const deleteOrder = async (id: number) => {
  await mutate(`${baseUrl}/${id}`, {
    method: "DELETE",
  }, ["canArtistClaim"])
}

export const acceptOrder = async (id: number) => {
  await mutate(`${baseUrl}/${id}/accept`, {
    method: "POST",
  }, [`orderId:${id}`])
}

export const changeRequestOrder = async (id: number, designId: number, comment: string, imageReferences: string[]) => {
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