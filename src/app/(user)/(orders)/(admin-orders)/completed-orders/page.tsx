"use client"

import { TypographyH2 } from "@/components/ui/typography"
import AdminOrdersDataTable from "../_components/AdminOrdersDataTable"
import ViewOrderButton from "../../_components/ViewOrderButton"
import { CellContext } from "@tanstack/react-table"
import GetOrdersModel from "@/types/getOrdersModel"

export default function CompletedOrdersPage() {
  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <div className="flex gap-2 justify-end">
        <ViewOrderButton id={order.id} variant="outline" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Completed Orders</TypographyH2>
      <AdminOrdersDataTable
        baseUrl="/api/orders/completed"
        actionCell={actionCell}
      />
    </div>
  )
}
