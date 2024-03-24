"use client"

import { TypographyH2 } from "@/components/ui/typography"
import AdminOrdersDataTable from "../_components/AdminOrdersDataTable"
import { CellContext } from "@tanstack/react-table"
import GetOrdersModel from "@/types/getOrdersModel"
import ViewOrderButton from "../../_components/ViewOrderButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"

export default function OngoingOrdersPage() {
  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <div className="flex gap-2 justify-end">
        <ViewOrderButton id={order.id} variant="outline" />
        <Button variant="outline" asChild>
          <Link href={`/edit-order/${order.id}`}>Edit</Link>
        </Button>
        <DeleteOrderDialog id={order.id} priority={order.priority} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Ongoing Orders</TypographyH2>
      <AdminOrdersDataTable
        baseUrl="/api/orders/ongoing"
        actionCell={actionCell}
      />
    </div>
  )
}
