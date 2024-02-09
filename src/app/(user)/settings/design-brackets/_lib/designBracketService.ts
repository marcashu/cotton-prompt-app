import { query } from "@/helpers/fetchHelper"
import DesignBracket from "@/types/designBracket"
import GetOrdersCountModel from "@/types/getOrdersCountModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/DesignBrackets`

export const getDesignBrackets = async (hasActiveFilter: boolean, active: boolean) => {
  const result = await query<DesignBracket[]>(`${baseUrl}?hasActiveFilter=${hasActiveFilter}&active=${active}`)
  return result
}

export const getDesignBracketOrdersCount = async (id: number) => {
  const result = await query<GetOrdersCountModel>(`${baseUrl}/${id}/orders/count`)
  return result
}