import { TypographyH3 } from "@/components/ui/typography"
import EmailTemplatesForm from "./_components/EmailTemplatesForm/EmailTemplatesForm"
import { getEmailTemplates } from "./_lib/emailTemplatesService"

export default async function EmailTemplatesPage() {
  const emailTemplates = await getEmailTemplates()

  return (
    <div className="px-8 max-w-3xl flex flex-col gap-4">
      <TypographyH3 withSeparator>Order Proof Ready Email</TypographyH3>
      <EmailTemplatesForm value={emailTemplates.orderProofReadyEmail} />
    </div>
  )
}
