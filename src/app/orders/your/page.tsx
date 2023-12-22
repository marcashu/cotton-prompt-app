"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import {
  normalArtistAvailableOrdersKey,
  priorityArtistAvailableOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import { TypographyH2 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"

export default function YourOrdersPage() {
  const { session } = useSession()
  const keyExtension = `&artistId=${session?.userId}`

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Your Orders</TypographyH2>
      <OrdersDataTable
        priority={true}
        url={`${priorityArtistAvailableOrdersKey}${keyExtension}`}
      />
      <OrdersDataTable
        priority={false}
        url={`${normalArtistAvailableOrdersKey}${keyExtension}`}
      />
    </div>
  )
}
