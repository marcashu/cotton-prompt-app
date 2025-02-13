"use server"

import { mutate } from "@/helpers/fetchHelper"
import { revalidateTag } from "next/cache"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Designs`

export const postComment = async (
  id: number,
  comment: string,
  userId: string,
  orderId: number
) => {
  await mutate(
    `${baseUrl}/${id}/Comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        comment,
        userId,
      }),
    },
    [`orderId:${orderId}`]
  )
}
