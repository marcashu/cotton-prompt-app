"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import {
  normalCheckerAvailableOrdersKey,
  priorityCheckerAvailableOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import { getCheckerActionCell } from "@/components/modules/orders/list/ordersListHelper"
import useSession from "@/hooks/useSession"

export default function AvailableOrderAsCheckerDataTables() {
  const { session } = useSession()

  if (!session?.userId) return <></>

  const priorityKey = priorityCheckerAvailableOrdersKey
  const normalKey = normalCheckerAvailableOrdersKey
  const priorityActionCell = getCheckerActionCell(session.userId, priorityKey)
  const normalActionCell = getCheckerActionCell(session.userId, normalKey)

  return (
    <>
      <OrdersDataTable
        title="Priority Orders"
        url={priorityKey}
        actionCell={priorityActionCell}
      />
      <OrdersDataTable
        title="Normal Orders"
        url={normalKey}
        actionCell={normalActionCell}
      />
    </>
  )
}
