import { query } from "@/helpers/fetchHelper"
import RatesModel from "@/types/ratesModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Settings/Rates`

export const getRates = async () => {
  const result = await query<RatesModel>(baseUrl)
  return result
}