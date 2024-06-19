import OrdersDataTableOrderNumber from "@/components/modules/orders/list/OrdersDataTableOrderNumber";
import { formatDateToYYYYMMDD } from "@/helpers/dateHelper";
import GetOrdersModel from "@/types/getOrdersModel";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import UserInfoCell from "../_components/AdminOrdersDataTable/UserInfoCell";
import AdminStatus from "@/enums/adminStatus";
import { TypographyP, TypographySmall } from "@/components/ui/typography";

const artistColumn: ColumnDef<GetOrdersModel> = {
  id: "artist",
  header: "Artist",
  cell: ({ row }) => {
    const order = row.original
    const result = UserInfoCell({ name: order.artistName, status: order.artistStatus })
    return result
  }
}

const checkerColumn: ColumnDef<GetOrdersModel> = {
  id: "checker",
  header: "Checker",
  cell: ({ row }) => {
    const order = row.original
    const result = UserInfoCell({ name: order.checkerName, status: order.checkerStatus })
    return result
  }
}

const customerColumn: ColumnDef<GetOrdersModel> = {
  id: "customer",
  header: "Customer",
  cell: ({ row }) => {
    const order = row.original
    const result = UserInfoCell({ name: order.customerName, status: order.customerStatus })
    return result
  }
}

const priorityColumn: ColumnDef<GetOrdersModel> = {
  id: "priority",
  accessorFn: (order) => order.priority ? 'Yes' : 'No',
  header: "Priority",
}

const reporterColumn: ColumnDef<GetOrdersModel> = {
  id: "reporter",
  header: "Reported By",
  cell: ({ row }) => {
    const order = row.original
    const result = TypographySmall({ children: order.reporterName, className: 'text-center' })
    return result
  }
}

const reasonColumn: ColumnDef<GetOrdersModel> = {
  id: "reason",
  header: "Reason",
  cell: ({ row }) => {
    const order = row.original
    const result = TypographyP({ children: order.reason, className: 'max-w-md' })
    return result
  }
}

const redrawColumn: ColumnDef<GetOrdersModel> = {
  id: "redraw",
  accessorFn: (order) => order.isReportRedraw ? 'Yes' : 'No',
  header: "Redraw Request",
}

const getDateHeader = (adminStatus: AdminStatus) => {
  if (adminStatus === AdminStatus.Ongoing) return 'Date Created'

  if (adminStatus === AdminStatus.SentForPrinting) return 'Date Sent'

  const result = `Date ${adminStatus}`
  return result
}

const getAdminOrdersColumnDef = (adminStatus: AdminStatus, actionCell: ({ row }: CellContext<GetOrdersModel, unknown>) => JSX.Element): ColumnDef<GetOrdersModel>[] => [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
    cell: (({ row }) => OrdersDataTableOrderNumber({ row, canView: true }))
  },
  {
    id: "date",
    accessorFn: (order) => formatDateToYYYYMMDD(order.date),
    header: getDateHeader(adminStatus),
  },
  ...(adminStatus !== AdminStatus.Reported ? [priorityColumn, artistColumn, checkerColumn, customerColumn] : [reporterColumn, redrawColumn, reasonColumn]),
  {
    id: "actions",
    cell: actionCell
  },
]

export default getAdminOrdersColumnDef