import { OrderFormValues } from "./form/OrderForm/orderFormSchema"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`

export const getOrderById = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    cache: "no-cache",
  })

  const result = await res.json()
  return result as GetOrderModel
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
}

export const deleteOrder = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error()
  }
}

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
}