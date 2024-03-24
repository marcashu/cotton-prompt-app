"use client"

import { TypographySmall } from "@/components/ui/typography"
import GetOrdersModel from "@/types/getOrdersModel"
import { Row } from "@tanstack/react-table"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function OrdersDataTableOrderNumber({
  row,
}: {
  row: Row<GetOrdersModel>
}) {
  const order = row.original
  const pathname = usePathname()

  return pathname.startsWith("/available-orders-as-artist") ? (
    <TypographySmall>{order.orderNumber}</TypographySmall>
  ) : (
    <Link href={`/view-order/${order.id}`} className="font-medium">
      {order.orderNumber}
    </Link>
  )
}
