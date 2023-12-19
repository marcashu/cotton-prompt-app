import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import GetOrdersModel from "@/types/getOrdersModel"
import { ColumnDef } from "@tanstack/react-table"
import OrdersDataTableActions from "./OrdersDataTableActions"

const ordersColumnDef: ColumnDef<GetOrdersModel>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    id: "date",
    accessorFn: (order) => formatDateToYYYYMMDD(order.createdOn),
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => OrdersDataTableActions({ row }),
  },
]

export default ordersColumnDef