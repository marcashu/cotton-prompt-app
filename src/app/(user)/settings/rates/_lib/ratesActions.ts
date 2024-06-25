'use server'

import { revalidatePath } from "next/cache"
import { RatesFormValues } from "./ratesFormSchema"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Settings/Rates`

export const updateRates = async (values: RatesFormValues, updatedBy: string) => {
  const res = await fetch(baseUrl, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,

      updatedBy,
    })
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/rates')
}