"use client"

import { Role } from "@/app/_lib/userConstants"
import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import ClaimOrderButton from "@/components/modules/orders/list/OrdersDataTableActions/ClaimOrderButton"
import { getOrderListKey } from "@/components/modules/orders/list/ordersListHelper"
import CanDoModel from "@/types/canDoModel"
import GetOrdersModel from "@/types/getOrdersModel"
import { CellContext } from "@tanstack/react-table"

export default function AvailableOrderAsArtistDataTables({
  canClaim,
}: {
  canClaim: CanDoModel
}) {
  const role = Role.Artist
  const priorityKey = getOrderListKey(role, true)
  const normalKey = getOrderListKey(role, false)

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <ClaimOrderButton
        id={order.id}
        priority={order.priority}
        canClaim={canClaim}
        role={role}
      />
    )
  }

  return (
    <>
      <OrdersDataTable
        priority={true}
        url={priorityKey}
        actionCell={actionCell}
      />
      <OrdersDataTable
        priority={false}
        url={normalKey}
        actionCell={actionCell}
      />
    </>
  )
}
