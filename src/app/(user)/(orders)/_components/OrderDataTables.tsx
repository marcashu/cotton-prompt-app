"use client"

import ViewOrderButton from "./ViewOrderButton"
import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"
import {
  normalOrdersKey,
  priorityOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import { Button } from "@/components/ui/button"
import GetOrdersModel from "@/types/getOrdersModel"
import { CellContext } from "@tanstack/react-table"
import Link from "next/link"

export default function OrderDataTables() {
  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <div className="flex gap-2 justify-end">
        <ViewOrderButton id={order.id} variant="outline" />
        <Button variant="outline" asChild>
          <Link href={`/orders/${order.id}/edit`}>Edit</Link>
        </Button>
        <DeleteOrderDialog id={order.id} priority={order.priority} />
      </div>
    )
  }

  return (
    <>
      <OrdersDataTable
        priority={true}
        url={priorityOrdersKey}
        actionCell={actionCell}
      />
      <OrdersDataTable
        priority={false}
        url={normalOrdersKey}
        actionCell={actionCell}
      />
    </>
  )
}
