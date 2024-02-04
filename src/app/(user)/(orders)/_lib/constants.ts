import OrdersDataTableOrderNumber from "@/components/modules/orders/list/OrdersDataTableOrderNumber"
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import GetOrdersModel from "@/types/getOrdersModel"
import { ColumnDef } from "@tanstack/react-table"
import ViewOrderButton from "../_components/ViewOrderButton"

export enum ArtistStatus {
  Claimed = "Claimed",
  DesignSubmitted = "Design Submitted",
  ForReupload = "For Reupload",
  Completed = "Completed",
}

export enum CheckerStatus {
  Claimed = "Claimed",
  ForReview = "For Review",
  ReuploadRequested = "Reupload Requested",
  Approved = "Approved",
}

export enum CustomerStatus {
  ForReview = "For Review",
  Accepted = "Accepted",
  ChangeRequested = "Change Requested",
}

export const columnDef: ColumnDef<GetOrdersModel>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: (({ row }) => OrdersDataTableOrderNumber({ row }))
  },
  {
    id: "date",
    accessorFn: (order) => formatDateToYYYYMMDD(order.createdOn),
    header: "Date",
  },
  {
    id: "artistStatus",
    accessorFn: (order) => order.artistStatus ?? '-',
    header: "Artist Status",
  },
  {
    id: "checkerStatus",
    accessorFn: (order) => order.checkerStatus ?? '-',
    header: "Checker Status",
  },
  {
    id: "priority",
    accessorFn: (order) => order.priority ? 'Yes' : 'No',
    header: "Priority",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return ViewOrderButton({ id: order.id })
    }
  },
]