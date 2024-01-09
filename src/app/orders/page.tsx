"use client"

import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import {
  normalOrdersKey,
  priorityOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import { Button } from "@/components/ui/button"
import { TypographyH2 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function OrdersPage() {
  const { session } = useSession()

  if (!session || session.userRole !== "admin") redirect("/")

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Orders</TypographyH2>
      <div className="self-end">
        <Button asChild>
          <Link href="/orders/create">Create Order</Link>
        </Button>
      </div>
      <OrdersDataTable priority={true} url={priorityOrdersKey} />
      <OrdersDataTable priority={false} url={normalOrdersKey} />
    </div>
  )
}
