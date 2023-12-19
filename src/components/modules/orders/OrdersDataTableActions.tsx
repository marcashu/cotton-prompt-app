import { Button } from "@/components/ui/button"
import GetOrdersModel from "@/types/getOrdersModel"
import { Row } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"

export default function OrdersDataTableActions({
  row,
}: {
  row: Row<GetOrdersModel>
}) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" size="icon">
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  )
}
