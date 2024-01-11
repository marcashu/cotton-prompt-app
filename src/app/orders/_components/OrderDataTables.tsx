"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"
import {
  normalOrdersKey,
  priorityOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import { Button } from "@/components/ui/button"
import GetOrdersModel from "@/types/getOrdersModel"
import { CellContext } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import Link from "next/link"

export default function OrderDataTables() {
  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <>
        <Button variant="outline" size="icon" asChild>
          <Link href={`/orders/${order.id}/edit`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <DeleteOrderDialog id={order.id} priority={order.priority} />
      </>
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
