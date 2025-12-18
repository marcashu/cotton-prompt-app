"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { TypographySmall } from "@/components/ui/typography"
import Role, { isAdmin } from "@/enums/role"
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import { formatNumberToCurrency } from "@/helpers/numberHelper"
import useSession from "@/hooks/useSession"
import GetInvoicesModel from "@/types/getInvoicesModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import useSWR from "swr"
import InvoicesDataFilters from "./InvoicesDataFilters"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { DataTableSimple } from "@/components/ui/data-table-simple"

const ensureHttps = (url: string) => {
  if (!url) return url
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return `https://${url}`
}

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
    ...(isAdmin(role)
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
          <div className="flex justify-end gap-2">
            {isAdmin(role) && invoice.paymentLink && (
              <Button asChild className="float-right" variant="blueButton">
                <a
                  href={ensureHttps(invoice.paymentLink)}
                  target="_blank"
                  onClick={() => {
                    navigator.clipboard.writeText(ensureHttps(invoice.paymentLink))

                    toast({
                      variant: "default",
                      title: "Payment link has been copied",
                    })
                  }}
                >
                  Pay me
                </a>
              </Button>
            )}
            <Button asChild className="float-right">
              <Link href={`/invoices/${invoice.id}`}>View</Link>
            </Button>
          </div>
        )
      },
    },
  ]

  return columnDef
}

function getDateRangeCategory(startDateStr: string) {
  const startDate = new Date(startDateStr)

  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const startOfPreviousWeek = new Date(startOfWeek)
  startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7)

  const endOfPreviousWeek = new Date(startOfWeek)
  endOfPreviousWeek.setDate(endOfPreviousWeek.getDate() - 1)

  if (startDate >= startOfWeek) {
    return "bg-blue-200"
  }
  if (startDate >= startOfPreviousWeek) {
    return "bg-red-200"
  }
  return "bg-gray-200"
}

const groupInvoicesByDate = (invoicesFiltered: GetInvoicesModel[]) => {
  const groupedInvoices: any[][] = []

  invoicesFiltered.forEach((invoice) => {
    const existingGroup = groupedInvoices.find(
      (group) =>
        group[0].startDate === invoice.startDate &&
        group[0].endDate === invoice.endDate
    )

    if (existingGroup) {
      existingGroup.push({
        ...invoice,
        color: getDateRangeCategory(invoice.startDate),
      })
    } else {
      groupedInvoices.push([
        {
          ...invoice,
          color: getDateRangeCategory(invoice.startDate),
        },
      ])
    }
  })

  return groupedInvoices
}
export default function InvoicesDataTable() {
  const { session } = useSession()
  const key = isAdmin(session?.selectedRole)
    ? "/api/invoices"
    : `/api/invoices?userId=${session?.userId}`
  const { data, isLoading } = useSWR<GetInvoicesModel[]>(key)

  const [invoicesFiltered, setInvoicesFiltered] = useState<GetInvoicesModel[]>(
    []
  )
  const [invoicesFilteredGrouped, setInvoicesFilteredGrouped] = useState<
    GetInvoicesModel[][]
  >([])
  const [currentInvoicePage, setCurrentInvoicePage] = useState(0)

  useEffect(() => {
    if (!data) return
    setInvoicesFilteredGrouped(groupInvoicesByDate(data))
    setInvoicesFiltered(data)
  }, [data])

  useEffect(() => {
    setInvoicesFilteredGrouped(groupInvoicesByDate(invoicesFiltered))
  }, [invoicesFiltered])

  return (
    <>
      <InvoicesDataFilters
        invoices={invoicesFiltered}
        setInvoices={setInvoicesFiltered}
        allInvoices={data ?? []}
      />

      <DataTableSimple
        columns={getColumnDef(session?.selectedRole)}
        data={invoicesFilteredGrouped[currentInvoicePage] ?? []}
        isLoading={isLoading}
        isSortByStartDate
        setInvoicesFiltered={setInvoicesFiltered}
        originalData={data}
      />

      {invoicesFiltered.length > 0 && (
        <div className="flex justify-between p-4">
          <Button
            variant="outline"
            onClick={() => {
              setCurrentInvoicePage(currentInvoicePage - 1)
            }}
            disabled={currentInvoicePage === 0}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setCurrentInvoicePage(currentInvoicePage + 1)
            }}
            disabled={
              currentInvoicePage ===
              groupInvoicesByDate(invoicesFiltered).length - 1
            }
          >
            Next
          </Button>
        </div>
      )}
    </>
  )
}
