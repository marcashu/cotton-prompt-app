"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import {
  normalOrdersKey,
  priorityOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import { TypographyH2 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
import { redirect } from "next/navigation"

export default function YourOrdersPage() {
  const { session } = useSession()

  if (!session || session.userRole === "admin") return redirect("/")

  const keyExtension = `&${session.userRole}Id=${session.userId}`
  const priorityKey = priorityOrdersKey + keyExtension
  const normalKey = normalOrdersKey + keyExtension

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Your Orders</TypographyH2>
      <OrdersDataTable priority={true} url={priorityKey} />
      <OrdersDataTable priority={false} url={normalKey} />
    </div>
  )
}
