import PrintColor from "@/types/printColor"
import GetOrdersCountModel from "@/types/getOrdersCountModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/PrintColors`

export const getPrintColors = async (hasActiveFilter: boolean, active: boolean) => {
  const res = await fetch(`${baseUrl}?hasActiveFilter=${hasActiveFilter}&active=${active}`)

  const result = await res.json()
  return result as PrintColor[]
}

export const getPrintColorOrdersCount = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}/orders/count`)

  const result = await res.json()
  return result as GetOrdersCountModel
}