import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import ViewOrderAction from "./ViewOrderAction"
import GetOrdersModel from "@/types/getOrdersModel"
import EditOrderAction from "./EditOrderAction"
import DeleteOrderAction from "./DeleteOrderAction"
import DownloadOrderAction from "./DownloadOrderAction"
import ResendForCustomerReviewAction from "./ResendForCustomerReviewAction"

export default function AdminOrdersDataTableActions({
  adminStatus,
  order,
  onDelete,
  onResend,
}: {
  adminStatus: "ongoing" | "rejected" | "completed"
  order: GetOrdersModel
  onDelete: (id: number) => void
  onResend: (id: number) => void
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <ViewOrderAction id={order.id} />
        {adminStatus === "ongoing" && (
          <>
            <EditOrderAction id={order.id} />
            <DeleteOrderAction id={order.id} onDelete={onDelete} />
          </>
        )}
        <DownloadOrderAction
          id={order.id}
          artistStatus={order.artistStatus}
          checkerStatus={order.checkerStatus}
        />
        {(adminStatus === "ongoing" || adminStatus === "completed") && (
          <ResendForCustomerReviewAction id={order.id} onResend={onResend} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
