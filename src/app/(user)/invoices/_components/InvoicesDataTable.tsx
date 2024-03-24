"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { TypographySmall } from "@/components/ui/typography"
import Role from "@/enums/role"
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import { formatNumberToCurrency } from "@/helpers/numberHelper"
import useSession from "@/hooks/useSession"
import GetInvoicesModel from "@/types/getInvoicesModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import useSWR from "swr"

const getColumnDef = (role?: Role) => {
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
      id: "billingPeriod",
      header: "Billing Period",
      accessorFn: (invoice) =>
        `${formatDateToYYYYMMDD(
          invoice.startDate,
          "/",
          false
        )} - ${formatDateToYYYYMMDD(invoice.endDate, "/", false)}`,
    },
    ...(role === Role.Admin
      ? [
          {
            header: "User",
            accessorKey: "user",
          },
        ]
      : []),
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      id: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const section = row.original
        return (
          <TypographySmall className="font-normal float-right">
            {formatNumberToCurrency(section.amount)}
          </TypographySmall>
        )
      },
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
      },
    },
  ]

  return columnDef
}
export default function InvoicesDataTable() {
  const { session } = useSession()
  const key =
    session?.selectedRole === Role.Admin
      ? "/api/invoices"
      : `/api/invoices?userId=${session?.userId}`
  const { data, isLoading } = useSWR<GetInvoicesModel[]>(key)

  return (
    <DataTable
      columns={getColumnDef(session?.selectedRole)}
      data={data ?? []}
      isLoading={isLoading}
    />
  )
}
