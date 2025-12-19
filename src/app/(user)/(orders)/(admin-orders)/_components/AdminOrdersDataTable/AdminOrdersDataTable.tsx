"use client"

import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import AdminOrderFilters from "./AdminOrderFilters"
import { useState, useCallback } from "react"
import { CellContext } from "@tanstack/react-table"
import getAdminOrdersColumnDef from "../../_lib/adminOrdersColumnDef"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"
import AdminOrdersDataTableActions from "./AdminOrdersDataTableActions"
import ResendOrderForCustomerReviewDialog from "./ResendOrderForCustomerReviewDialog"
import AdminStatus from "@/enums/adminStatus"
import ResolveOrderDialog from "./ResolveOrderDialog"
import SendOrderForPrintingDialog from "./SendOrderForPrintingDialog"
import OrderFiltersModel from "@/types/orderFiltersModel"
import ToggleOrderRedrawMarkDialog from "./ToggleOrderRedrawMarkDialog"
import CompleteOrderDialog from "./CompleteOrderDialog"
import PaginatedResult from "@/types/paginatedResult"
import { Button } from "@/components/ui/button"
import { TypographySmall } from "@/components/ui/typography"

const sortOrdersByStatus = (a: GetOrdersModel, b: GetOrdersModel) => {
  if (!a.customerStatus && !a.checkerStatus && !a.artistStatus) return -1
  if (!b.customerStatus && !b.checkerStatus && !b.artistStatus) return 1

  return 0
}

// Pages that use pagination
const paginatedStatuses = [AdminStatus.SentForPrinting, AdminStatus.Rejected]

export default function AdminOrdersDataTable({
  adminStatus,
}: {
  adminStatus: AdminStatus
}) {
  const hasPagination = paginatedStatuses.includes(adminStatus)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<OrderFiltersModel>({
    orderNumbers: [],
    priorities: [],
    artists: [],
    checkers: [],
    customers: [],
    status: [],
    userGroups: [],
  })

  // Build URL for API call
  const queryParams = new URLSearchParams()
  if (filters.orderNumbers.length)
    queryParams.append("orderNumbers", filters.orderNumbers.join(","))
  if (filters.priorities.length)
    queryParams.append("priorities", filters.priorities.join(","))
  if (filters.artists.length)
    queryParams.append("artists", filters.artists.join(","))
  if (filters.checkers.length)
    queryParams.append("checkers", filters.checkers.join(","))
  if (filters.customers.length)
    queryParams.append("customers", filters.customers.join(","))
  if (filters.status.length)
    queryParams.append("status", filters.status.join(","))
  if (filters.userGroups.length)
    queryParams.append("userGroups", filters.userGroups.join(","))
  if (hasPagination) {
    queryParams.append("page", currentPage.toString())
    queryParams.append("pageSize", "10")
  }
  const apiUrl = `/api/orders/${adminStatus}?${queryParams.toString()}`

  // For paginated endpoints, data is PaginatedResult<GetOrdersModel>
  // For non-paginated endpoints, data is GetOrdersModel[]
  const { data, isLoading, mutate } = useSWR<PaginatedResult<GetOrdersModel> | GetOrdersModel[]>(
    apiUrl,
    { keepPreviousData: true }
  )

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openResendDialog, setOpenResendDialog] = useState(false)
  const [openResolveDialog, setOpenResolveDialog] = useState(false)
  const [openSendForPrintingDialog, setOpenSendForPrintingDialog] =
    useState(false)
  const [openToggleRedrawMarkDialog, setOpenToggleRedrawMarkDialog] =
    useState(false)
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<GetOrdersModel>()

  // Helper to get orders array from either response type
  const orders = hasPagination
    ? (data as PaginatedResult<GetOrdersModel>)?.items ?? []
    : (data as GetOrdersModel[]) ?? []
  const totalCount = hasPagination
    ? (data as PaginatedResult<GetOrdersModel>)?.totalCount ?? 0
    : orders.length
  const totalPages = hasPagination
    ? (data as PaginatedResult<GetOrdersModel>)?.totalPages ?? 1
    : 1

  const handleSearch = useCallback((orderFilters: OrderFiltersModel) => {
    setFilters(orderFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  const handleDelete = (id: number) => {
    const order = orders.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }

  const handleResend = (id: number) => {
    const order = orders.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenResendDialog(true)
  }

  const handleResolve = (id: number) => {
    const order = orders.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenResolveDialog(true)
  }

  const handleSendForPrinting = (id: number) => {
    const order = orders.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenSendForPrintingDialog(true)
  }

  const handleToggleRedrawMark = (id: number) => {
    const order = orders.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenToggleRedrawMarkDialog(true)
  }

  const handleComplete = (id: number) => {
    const order = orders.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenCompleteDialog(true)
  }

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <AdminOrdersDataTableActions
        adminStatus={adminStatus}
        order={order}
        onDelete={handleDelete}
        onResend={handleResend}
        onResolve={handleResolve}
        onSendForPrinting={handleSendForPrinting}
        onToggleRedrawMark={handleToggleRedrawMark}
        onComplete={handleComplete}
      />
    )
  }

  return (
    <>
      {selectedOrder && (
        <>
          <DeleteOrderDialog
            id={selectedOrder.id}
            open={openDeleteDialog}
            mutate={mutate}
            handleClose={() => setOpenDeleteDialog(false)}
          />
          <ResendOrderForCustomerReviewDialog
            id={selectedOrder.id}
            open={openResendDialog}
            mutate={mutate}
            handleClose={() => setOpenResendDialog(false)}
            adminStatus={adminStatus}
          />
          <ResolveOrderDialog
            id={selectedOrder.id}
            isDesignSubmitted={!!selectedOrder.isReportDesignSubmitted}
            isRedraw={!!selectedOrder.isReportRedraw}
            isChangeRequest={!!selectedOrder.originalOrderId}
            open={openResolveDialog}
            mutate={mutate}
            handleClose={() => setOpenResolveDialog(false)}
          />
          <SendOrderForPrintingDialog
            id={selectedOrder.id}
            open={openSendForPrintingDialog}
            mutate={mutate}
            handleClose={() => setOpenSendForPrintingDialog(false)}
          />
          <ToggleOrderRedrawMarkDialog
            id={selectedOrder.id}
            isRedraw={!!selectedOrder.isReportRedraw}
            open={openToggleRedrawMarkDialog}
            mutate={mutate}
            handleClose={() => setOpenToggleRedrawMarkDialog(false)}
          />
          <CompleteOrderDialog
            id={selectedOrder.id}
            open={openCompleteDialog}
            mutate={mutate}
            handleClose={() => setOpenCompleteDialog(false)}
          />
        </>
      )}
      <AdminOrderFilters
        count={totalCount}
        adminStatus={adminStatus}
        onSearch={handleSearch}
      />
      <DataTable
        columns={getAdminOrdersColumnDef(adminStatus, actionCell)}
        data={orders.sort(sortOrdersByStatus)}
        isLoading={isLoading}
        isColorCoding
      />

      {/* Server-side Pagination Controls - only show for paginated pages */}
      {hasPagination && (
        <div className="flex justify-between items-center p-4 border-t">
          <TypographySmall className="text-muted-foreground">
            Page {currentPage} of {totalPages} ({totalCount} total orders)
          </TypographySmall>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || isLoading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentPage((p) => p + 1)
              }}
              disabled={currentPage >= totalPages || isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
