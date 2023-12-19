"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { TypographyH2 } from "@/components/ui/typography"
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import Order from "@/types/order"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

export default function OrdersPage() {
  const { data, isLoading } = useSWR<Order[]>(`/api/orders`)

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "number",
      header: "Order Number",
    },
    {
      id: "priority",
      accessorFn: (order) => (order.isPriority ? "Yes" : "No"),
      header: "Priority",
    },
    {
      id: "date",
      accessorFn: (order) => formatDateToYYYYMMDD(order.createdOn),
      header: "Date",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Orders</TypographyH2>
      <div className="self-end">
        <Button asChild>
          <Link href="/orders/create">Create Order</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </div>
  )
}
