import { Button } from "@/components/ui/button"
import GetOrdersModel from "@/types/getOrdersModel"
import { Row } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import DeleteOrderDialog from "./DeleteOrderDialog"
import Link from "next/link"

export default function OrdersDataTableActions({
  row,
}: {
  row: Row<GetOrdersModel>
}) {
  const order = row.original

  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="icon" asChild>
        <Link href={`/orders/${order.id}/edit`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <DeleteOrderDialog id={order.id} priority={order.priority} />
    </div>
  )
}
