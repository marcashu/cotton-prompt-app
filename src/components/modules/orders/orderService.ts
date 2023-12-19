import { CreateOrderFormValues } from "./create/CreateOrderForm/createOrderFormSchema"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`

export const createOrder = async (value: CreateOrderFormValues) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...value,
      imageReferences: value.imageReferences?.map((ir) => ir.value),
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