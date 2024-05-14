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
import CustomerStatus from "@/enums/customerStatus"
import AdminStatus from "@/enums/adminStatus"
import ResolveOrderAction from "./ResolveOrderAction"
import SendForPrintingOrderAction from "./SendForPrintingOrderAction"

export default function AdminOrdersDataTableActions({
  adminStatus,
  order,
  onDelete,
  onResend,
  onResolve,
  onSendForPrinting,
}: {
  adminStatus: AdminStatus
  order: GetOrdersModel
  onDelete: (id: number) => void
  onResend: (id: number) => void
  onResolve: (id: number) => void
  onSendForPrinting: (id: number) => void
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
        {(adminStatus === AdminStatus.Ongoing ||
          adminStatus === AdminStatus.Completed) &&
          !!order.originalOrderId && (
            <ViewOrderAction
              id={order.originalOrderId!}
              label="View Original Order"
            />
          )}
        {adminStatus === AdminStatus.Rejected &&
          !!order.changeRequestOrderId && (
            <ViewOrderAction
              id={order.changeRequestOrderId!}
              label="View Change Request Order"
            />
          )}
        {(adminStatus === AdminStatus.Ongoing ||
          adminStatus === AdminStatus.Reported) && (
          <>
            <EditOrderAction id={order.id} />
            <DeleteOrderAction id={order.id} onDelete={onDelete} />
          </>
        )}
        {adminStatus !== AdminStatus.Reported && (
          <DownloadOrderAction
            id={order.id}
            artistStatus={order.artistStatus}
            checkerStatus={order.checkerStatus}
          />
        )}
        {adminStatus !== AdminStatus.Rejected &&
          (order.customerStatus === CustomerStatus.ForReview ||
            order.customerStatus === CustomerStatus.Accepted) && (
            <ResendForCustomerReviewAction id={order.id} onResend={onResend} />
          )}
        {adminStatus === AdminStatus.Reported && (
          <ResolveOrderAction id={order.id} onResolve={onResolve} />
        )}
        {adminStatus === AdminStatus.Completed && (
          <SendForPrintingOrderAction
            id={order.id}
            onSendForPrinting={onSendForPrinting}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
