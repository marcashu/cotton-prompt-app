import { query } from "@/helpers/fetchHelper"
import EmailTemplatesModel from "@/types/emailTemplatesModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/EmailTemplates`

export const getEmailTemplates = async () => {
  const result = await query<EmailTemplatesModel>(baseUrl)
  return result
}