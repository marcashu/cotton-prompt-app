"use client"

import ViewOrderButton from "@/app/(orders)/_components/ViewOrderButton"
import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import ClaimOrderButton from "@/components/modules/orders/list/OrdersDataTableActions/ClaimOrderButton"
import { getOrderListKey } from "@/components/modules/orders/list/ordersListHelper"
import useSession from "@/hooks/useSession"
import CanClaimModel from "@/types/canClaimModel"
import GetOrdersModel from "@/types/getOrdersModel"
import { CellContext } from "@tanstack/react-table"

export default function AvailableOrderAsCheckerDataTables() {
  const role = "checker"
  const priorityKey = getOrderListKey(role, true)
  const normalKey = getOrderListKey(role, false)
  const { session } = useSession()

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original

    const canClaim: CanClaimModel =
      session?.userId === order.artistId
        ? {
            canClaim: false,
            message: "You can't claim an order if you are the artist",
          }
        : {
            canClaim: true,
            message: "",
          }

    return (
      <div className="flex gap-2 justify-end">
        <ClaimOrderButton
          id={order.id}
          priority={order.priority}
          canClaim={canClaim}
          role={role}
        />
        <ViewOrderButton id={order.id} variant="outline" />
      </div>
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
