import axios from "axios"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users`

export const savePaymentLinkApi = async (
  userId: string,
  paymentLink: string
) => {
  try {
    const { data } = await axios.post(`${baseUrl}/paymentLink`, {
      paymentLink,
      userId,
    })
    return data
  } catch (error) {
    console.error(error)
  }
}
