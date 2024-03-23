'use client'

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { TypographySmall } from "@/components/ui/typography"
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import useSession from "@/hooks/useSession"
import GetInvoicesModel from "@/types/getInvoicesModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import useSWR from "swr"

const columnDef: ColumnDef<GetInvoicesModel>[] = [
  {
    header: "Invoice ID",
    cell: ({ row }) => {
      const invoice = row.original
      return (
        <Link href={`/invoices/${invoice.id}`} className="font-medium">
          {invoice.id.substring(0, 5).toUpperCase()}
        </Link>
      )
    },
  },
  {
    header: "Billing Period",
    cell: ({ row }) => {
      const invoice = row.original
      return (
        <TypographySmall className="font-normal">{`${formatDateToYYYYMMDD(invoice.startDate, '/')} - ${formatDateToYYYYMMDD(invoice.endDate, '/')}`}</TypographySmall>
      )
    },
  },
  {
    header: "Amount",
    cell: ({ row }) => {
      const invoice = row.original
      return (
        <TypographySmall className="font-normal">{`$${invoice.amount.toFixed(2)}`}</TypographySmall>
      )
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original
      return (
        <Button asChild className="float-right">
          <Link href={`/invoices/${invoice.id}`}>View</Link>
        </Button>
      )
    }
  },
]

export default function InvoicesDataTable() {
  const {session} = useSession()
  const { data, isLoading } = useSWR<GetInvoicesModel[]>(`/api/invoices?userId=${session?.userId}`)
  
  return (
    <DataTable
      columns={columnDef}
      data={data ?? []}
      isLoading={isLoading}
    />
  )
}