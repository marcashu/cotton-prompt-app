"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import { getOrderListKey } from "@/components/modules/orders/list/ordersListHelper"
import { TypographyH2 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"

export default function YourOrdersPage() {
  const { session } = useSession()

  if (!session || session.userRole === "admin") return <></>

  const keyExtension = `&${session.userRole}Id=${session.userId}`

  const priorityKey = getOrderListKey(session.userRole, true)
  const normalKey = getOrderListKey(session.userRole, false)

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Your Orders</TypographyH2>
      <OrdersDataTable priority={true} url={`${priorityKey}${keyExtension}`} />
      <OrdersDataTable priority={false} url={`${normalKey}${keyExtension}`} />
    </div>
  )
}
