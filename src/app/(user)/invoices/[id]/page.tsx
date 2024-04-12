"use client"

import GetInvoiceModel from "@/types/getInvoiceModel"
import useSWR from "swr"
import PageHeaderWithBack from "../../_components/PageHeaderWithBack"
import { TypographyLarge, TypographyMuted } from "@/components/ui/typography"
import { formatDateToMMMDDYYYY } from "@/helpers/dateHelper"
import { formatNumberToCurrency } from "@/helpers/numberHelper"
import InvoiceSectionsDataTable from "./_components/InvoiceSectionsDataTable"

export default function InvoiceDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: invoice, isLoading } = useSWR<GetInvoiceModel>(
    `/api/invoices/${params.id}`
  )

  if (isLoading || !invoice) return <></>

  return (
    <div className="flex flex-col gap-4">
      <PageHeaderWithBack
        title={`Invoice ${invoice.id.substring(0, 5).toUpperCase()}`}
        description="Viewing invoice details."
      />
      <div>
        <div className="flex flex-row gap-20">
          <TypographyMuted className="text-lg grow text-right">
            Date:
          </TypographyMuted>
          <TypographyMuted className="text-lg text-right w-40">
            {formatDateToMMMDDYYYY(invoice.endDate, false)}
          </TypographyMuted>
        </div>
        <div className="flex flex-row gap-20">
          <TypographyMuted className="text-lg grow text-right">
            Due Date:
          </TypographyMuted>
          <TypographyMuted className="text-lg text-right w-40">
            {formatDateToMMMDDYYYY(invoice.endDate, false)}
          </TypographyMuted>
        </div>
        <div className="flex flex-row gap-20">
          <TypographyLarge className="text-lg grow text-right">
            Balance Due:
          </TypographyLarge>
          <TypographyLarge className="text-lg text-right w-40">
            {formatNumberToCurrency(invoice.amount)}
          </TypographyLarge>
        </div>
      </div>
      <InvoiceSectionsDataTable data={invoice.sections} isLoading={isLoading} />
    </div>
  )
}
