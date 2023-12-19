"use client"

import NormalOrdersDataTable from "@/components/modules/orders/list/NormalOrdersDataTable"
import PriorityOrdersDataTable from "@/components/modules/orders/list/PriorityOrdersDataTable"
import { Button } from "@/components/ui/button"
import { TypographyH2 } from "@/components/ui/typography"
import Link from "next/link"

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Orders</TypographyH2>
      <div className="self-end">
        <Button asChild>
          <Link href="/orders/create">Create Order</Link>
        </Button>
      </div>
      <PriorityOrdersDataTable />
      <NormalOrdersDataTable />
    </div>
  )
}
