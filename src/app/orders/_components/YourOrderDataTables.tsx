"use client"

import ViewOrderButton from "@/app/(orders)/_components/ViewOrderButton"
import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import {
  normalOrdersKey,
  priorityOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import useSession from "@/hooks/useSession"
import GetOrdersModel from "@/types/getOrdersModel"
import Role from "@/types/role"
import { CellContext } from "@tanstack/react-table"

export default function YourOrderDataTables({ role }: { role: Role }) {
  const { session } = useSession()

  if (!session) return <></>

  const keyExtension = `&${role}Id=${session.userId}`
  const priorityKey = priorityOrdersKey + keyExtension
  const normalKey = normalOrdersKey + keyExtension

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return <ViewOrderButton id={order.id} />
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
