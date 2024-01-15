import DesignBracket from "@/types/designBracket"
import GetOrdersCountModel from "@/types/getOrdersCountModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/DesignBrackets`

export const getDesignBrackets = async (hasActiveFilter: boolean, active: boolean) => {
  const res = await fetch(`${baseUrl}?hasActiveFilter=${hasActiveFilter}&active=${active}`)

  const result = await res.json()
  return result as DesignBracket[]
}

export const getDesignBracketOrdersCount = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}/orders/count`)

  const result = await res.json()
  return result as GetOrdersCountModel
}