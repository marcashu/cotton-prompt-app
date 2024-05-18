import { query } from "@/helpers/fetchHelper"
import GetOrderModel from "@/types/getOrderModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`

export const getOrderById = async (id: number) => {
  const result = await query<GetOrderModel>(`${baseUrl}/${id}`, {
    next: { tags: [`orderId:${id}`] }, cache: 'no-store'
  })
  return result
}