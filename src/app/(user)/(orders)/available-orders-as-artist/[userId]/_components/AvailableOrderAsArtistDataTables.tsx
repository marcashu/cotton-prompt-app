"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import { getArtistActionCell } from "@/components/modules/orders/list/ordersListHelper"
import useSession from "@/hooks/useSession"
import CanDoModel from "@/types/canDoModel"
import useSWR from "swr"

export default function AvailableOrderAsArtistDataTables({
  userId,
}: {
  userId: string
}) {
  const { session } = useSession()
  const canClaimMutateKey = `/api/artists/${userId}/can-claim`
  const { data: canClaim, isLoading } = useSWR<CanDoModel>(canClaimMutateKey)
  const { data: canClaimChangeRequestOrders } = useSWR<CanDoModel>(
    `/api/artists/${session?.userId}/can-claim-change-request`
  )
  const baseKey = `/api/orders/available-as-artist?artistId=${userId}`
  const changeRequestKey = `${baseKey}&changeRequest=true`
  const priorityKey = `${baseKey}&priority=${true}`
  const normalKey = `${baseKey}&priority=${false}`

  if (isLoading || !canClaim) return <></>

  const crActionCell = getArtistActionCell(
    canClaim,
    changeRequestKey,
    canClaimMutateKey
  )
  const priorityActionCell = getArtistActionCell(
    canClaim,
    priorityKey,
    canClaimMutateKey
  )
  const normalActionCell = getArtistActionCell(
    canClaim,
    normalKey,
    canClaimMutateKey
  )

  return (
    <>
      {!!canClaimChangeRequestOrders?.canDo && (
        <OrdersDataTable
          title="Change Request Orders"
          url={changeRequestKey}
          actionCell={crActionCell}
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
