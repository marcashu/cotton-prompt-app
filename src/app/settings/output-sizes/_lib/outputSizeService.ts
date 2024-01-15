import OutputSize from "@/types/outputSize"
import GetOrdersCountModel from "@/types/getOrdersCountModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/OutputSizes`

export const getOutputSizes = async (hasActiveFilter: boolean, active: boolean) => {
  const res = await fetch(`${baseUrl}?hasActiveFilter=${hasActiveFilter}&active=${active}`)

  const result = await res.json()
  return result as OutputSize[]
}

export const getOutputSizeOrdersCount = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}/orders/count`)

  const result = await res.json()
  return result as GetOrdersCountModel
}