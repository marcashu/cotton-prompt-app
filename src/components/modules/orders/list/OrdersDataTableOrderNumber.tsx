"use client"

import { TypographySmall } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
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
  const { session } = useSession()
  const pathname = usePathname()

  return session?.userRole === "artist" && pathname === "/orders/available" ? (
    <TypographySmall>{order.orderNumber}</TypographySmall>
  ) : (
    <Link href={`/orders/${order.id}/view`} className="font-medium">
      {order.orderNumber}
    </Link>
  )
}
