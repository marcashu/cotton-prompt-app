import { formatDateToYYYYMMDD } from "@/helpers/dateHelper"
import GetOrdersModel from "@/types/getOrdersModel"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import OrdersDataTableOrderNumber from "./OrdersDataTableOrderNumber"
import { ArtistStatus } from "@/app/(orders)/_lib/constants"

const getOrdersColumnDef = (actionCell: ({ row }: CellContext<GetOrdersModel, unknown>) => JSX.Element): ColumnDef<GetOrdersModel>[] => [
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
    id: "actions",
    cell: actionCell
  },
]

const priorityOrdersKey = "/api/orders?priority=true"
const normalOrdersKey = "/api/orders?priority=false"
const priorityArtistAvailableOrdersKey = `${priorityOrdersKey}&noArtist=true`
const normalArtistAvailableOrdersKey = `${normalOrdersKey}&noArtist=true`
const priorityCheckerAvailableOrdersKey = `${priorityOrdersKey}&noChecker=true&artistStatus=${ArtistStatus.DesignSubmitted}`
const normalCheckerAvailableOrdersKey = `${normalOrdersKey}&noChecker=true&artistStatus=${ArtistStatus.DesignSubmitted}`

export {
  getOrdersColumnDef,
  priorityOrdersKey,
  normalOrdersKey,
  priorityArtistAvailableOrdersKey,
  normalArtistAvailableOrdersKey,
  priorityCheckerAvailableOrdersKey,
  normalCheckerAvailableOrdersKey,
}