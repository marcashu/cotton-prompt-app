'use server'

import { revalidatePath } from "next/cache"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/EmailTemplates`

export const updateOrderProof = async (content: string) => {
  const res = await fetch(baseUrl, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    })
  })

  if (!res.ok) {
    throw new Error()
  }

  revalidatePath('/settings/email-templates')
}