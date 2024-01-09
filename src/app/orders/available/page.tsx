"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import { getOrderListKey } from "@/components/modules/orders/list/ordersListHelper"
import { TypographyH2 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
import { redirect } from "next/navigation"

export default function AvailableOrdersPage() {
  const { session } = useSession()

  if (!session || session.userRole === "admin") redirect("/")

  const priorityKey = getOrderListKey(session.userRole, true)
  const normalKey = getOrderListKey(session.userRole, false)

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Available Orders</TypographyH2>
      <OrdersDataTable priority={true} url={priorityKey} />
      <OrdersDataTable priority={false} url={normalKey} />
    </div>
  )
}
