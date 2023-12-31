import GetOrderModel from "@/types/getOrderModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`

export const getOrderById = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    next: { tags: [`orderId:${id}`] }
  })

  const result = await res.json()
  return result as GetOrderModel
}