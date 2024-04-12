import PrintColor from "@/types/printColor"
import GetOrdersCountModel from "@/types/getOrdersCountModel"
import { query } from "@/helpers/fetchHelper"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/PrintColors`

export const getPrintColors = async (hasActiveFilter: boolean, active: boolean) => {
  const result = await query<PrintColor[]>(`${baseUrl}?hasActiveFilter=${hasActiveFilter}&active=${active}`)
  return result
}

export const getPrintColorOrdersCount = async (id: number) => {
  const result = await query<GetOrdersCountModel>(`${baseUrl}/${id}/orders/count`)
  return result
}