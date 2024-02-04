"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import { getArtistActionCell } from "@/components/modules/orders/list/ordersListHelper"
import CanDoModel from "@/types/canDoModel"

export default function AvailableOrderAsArtistDataTables({
  userId,
  canClaim,
}: {
  userId: string
  canClaim: CanDoModel
}) {
  const baseKey = `/api/orders/available-as-artist?artistId=${userId}`
  const changeRequestKey = `${baseKey}&changeRequest=true`
  const priorityKey = `${baseKey}&priority=${true}`
  const normalKey = `${baseKey}&priority=${false}`
  const crActionCell = getArtistActionCell(canClaim, changeRequestKey)
  const priorityActionCell = getArtistActionCell(canClaim, priorityKey)
  const normalActionCell = getArtistActionCell(canClaim, normalKey)

  return (
    <>
      <OrdersDataTable
        title="Change Request Orders"
        url={changeRequestKey}
        actionCell={crActionCell}
        hideWhenEmpty
      />
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
