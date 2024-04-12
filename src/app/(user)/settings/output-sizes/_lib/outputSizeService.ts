import OutputSize from "@/types/outputSize"
import GetOrdersCountModel from "@/types/getOrdersCountModel"
import { query } from "@/helpers/fetchHelper"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/OutputSizes`

export const getOutputSizes = async (hasActiveFilter: boolean, active: boolean) => {
  const result = await query<OutputSize[]>(`${baseUrl}?hasActiveFilter=${hasActiveFilter}&active=${active}`)
  return result
}

export const getOutputSizeOrdersCount = async (id: number) => {
  const result = await query<GetOrdersCountModel>(`${baseUrl}/${id}/orders/count`)
  return result as GetOrdersCountModel
}