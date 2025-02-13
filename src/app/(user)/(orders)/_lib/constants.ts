import OrdersDataTableOrderNumber from "@/components/modules/orders/list/OrdersDataTableOrderNumber"
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import GetOrdersModel from "@/types/getOrdersModel"
import { ColumnDef } from "@tanstack/react-table"
import ViewOrderButton from "../_components/ViewOrderButton"

export const getMinutes = (date: string) => {
  const date1 = new Date(date)
  date1.setHours(date1.getHours() + 12)
  const currentDate = new Date()

  const diff = date1.getTime() - currentDate.getTime()

  return Math.floor(diff / 60000)
}

export const columnDef: ColumnDef<GetOrdersModel>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: ({ row }) => OrdersDataTableOrderNumber({ row, canView: true }),
  },
  {
    id: "date",
    accessorFn: (order) => formatDateToYYYYMMDD(order.date),
    header: "Date",
  },
  {
    id: "artistStatus",
    accessorFn: (order) => order.artistStatus ?? "-",
    header: "Artist Status",
  },
  {
    id: "checkerStatus",
    accessorFn: (order) => order.checkerStatus ?? "-",
    header: "Checker Status",
  },
  {
    id: "priority",
    accessorFn: (order) => (order.priority ? "Yes" : "No"),
    header: "Priority",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      const isClaimedArtist =
        order.artistStatus === "Claimed" &&
        !order.checkerStatus &&
        !order.customerStatus

      const isClaimedChecker =
        order.artistStatus === "Design Submitted" &&
        order.checkerStatus === "For Review" &&
        !order.customerStatus

      return ViewOrderButton({
        id: order.id,
        isTimer: isClaimedArtist || isClaimedChecker,
        minutes: getMinutes(order.updatedOn ?? ""),
      })
    },
  },
]
