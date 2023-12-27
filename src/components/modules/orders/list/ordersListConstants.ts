import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import GetOrdersModel from "@/types/getOrdersModel"
import { ColumnDef } from "@tanstack/react-table"
import OrdersDataTableActions from "./OrdersDataTableActions/OrdersDataTableActions"
import OrdersDataTableOrderNumber from "./OrdersDataTableOrderNumber"

const ordersColumnDef: ColumnDef<GetOrdersModel>[] = [
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
    id: "actions",
    cell: ({ row }) => OrdersDataTableActions({ row })
  },
]

const priorityOrdersKey = "/api/orders?priority=true"
const normalOrdersKey = "/api/orders?priority=false"
const priorityArtistAvailableOrdersKey = `${priorityOrdersKey}&hasArtistFilter=true`
const normalArtistAvailableOrdersKey = `${normalOrdersKey}&hasArtistFilter=true`
const priorityCheckerAvailableOrdersKey = `${priorityOrdersKey}&hasCheckerFilter=true`
const normalCheckerAvailableOrdersKey = `${normalOrdersKey}&hasCheckerFilter=true`

export {
  ordersColumnDef,
  priorityOrdersKey,
  normalOrdersKey,
  priorityArtistAvailableOrdersKey,
  normalArtistAvailableOrdersKey,
  priorityCheckerAvailableOrdersKey,
  normalCheckerAvailableOrdersKey,
}