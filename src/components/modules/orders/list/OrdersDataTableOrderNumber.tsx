import { TypographySmall } from "@/components/ui/typography"
import GetOrdersModel from "@/types/getOrdersModel"
import { Row } from "@tanstack/react-table"
import Link from "next/link"

export default function OrdersDataTableOrderNumber({
  row,
  canView,
}: {
  row: Row<GetOrdersModel>
  canView: boolean
}) {
  const order = row.original

  return canView ? (
    <Link href={`/view-order/${order.id}`} className="font-medium">
      {order.orderNumber}
    </Link>
  ) : (
    <TypographySmall>{order.orderNumber}</TypographySmall>
  )
}
