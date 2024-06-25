"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import { getCheckerActionCell } from "@/components/modules/orders/list/ordersListHelper"
import useSession from "@/hooks/useSession"
import CanDoModel from "@/types/canDoModel"
import useSWR from "swr"

export default function AvailableOrderAsCheckerDataTables() {
  const { session } = useSession()
  const { data: canClaimTrainingGroupOrders } = useSWR<CanDoModel>(
    `/api/checkers/${session?.userId}/can-claim-training-group`
  )

  if (!session?.userId) return <></>

  const baseKey = "/api/orders/available-as-checker"
  const priorityKey = `${baseKey}?priority=true&trainingGroup=false`
  const normalKey = `${baseKey}?priority=false&trainingGroup=false`
  const trainingGroupKey = `${baseKey}?trainingGroup=true`
  const priorityActionCell = getCheckerActionCell(session.userId, priorityKey)
  const normalActionCell = getCheckerActionCell(session.userId, normalKey)
  const trainingGroupActionCell = getCheckerActionCell(
    session.userId,
    trainingGroupKey
  )

  return (
    <>
      {!!canClaimTrainingGroupOrders?.canDo && (
        <OrdersDataTable
          title="Training Group Orders"
          url={trainingGroupKey}
          actionCell={trainingGroupActionCell}
        />
      )}
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
