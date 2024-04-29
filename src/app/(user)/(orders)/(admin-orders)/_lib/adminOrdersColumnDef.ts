import OrdersDataTableOrderNumber from "@/components/modules/orders/list/OrdersDataTableOrderNumber";
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper";
import GetOrdersModel from "@/types/getOrdersModel";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import UserInfoCell from "../_components/AdminOrdersDataTable/UserInfoCell";

const getAdminOrdersColumnDef = (actionCell: ({ row }: CellContext<GetOrdersModel, unknown>) => JSX.Element): ColumnDef<GetOrdersModel>[] => [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: (({ row }) => OrdersDataTableOrderNumber({ row, canView: true }))
  },
  {
    id: "date",
    accessorFn: (order) => formatDateToYYYYMMDD(order.createdOn),
    header: "Date",
  },
  {
    id: "priority",
    accessorFn: (order) => order.priority ? 'Yes' : 'No',
    header: "Priority",
  },
  {
    id: "artist",
    header: "Artist",
    cell: ({ row }) => {
      const order = row.original
      const result = UserInfoCell({ name: order.artistName, status: order.artistStatus })
      return result
    }
  },
  {
    id: "checker",
    header: "Checker",
    cell: ({ row }) => {
      const order = row.original
      const result = UserInfoCell({ name: order.checkerName, status: order.checkerStatus })
      return result
    }
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original
      const result = UserInfoCell({ name: order.customerName, status: order.customerStatus })
      return result
    }
  },
  {
    id: "actions",
    cell: actionCell
  },
]

export default getAdminOrdersColumnDef