"use client"

import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import AdminOrderFilters from "../_components/AdminOrdersDataTable/AdminOrderFilters"
import { useState, useCallback } from "react"
import { CellContext } from "@tanstack/react-table"
import getAdminOrdersColumnDef from "../_lib/adminOrdersColumnDef"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"
import AdminOrdersDataTableActions from "../_components/AdminOrdersDataTable/AdminOrdersDataTableActions"
import ResendOrderForCustomerReviewDialog from "../_components/AdminOrdersDataTable/ResendOrderForCustomerReviewDialog"
import AdminStatus from "@/enums/adminStatus"
import SendOrderForPrintingDialog from "../_components/AdminOrdersDataTable/SendOrderForPrintingDialog"
import OrderFiltersModel from "@/types/orderFiltersModel"
import CompleteOrderDialog from "../_components/AdminOrdersDataTable/CompleteOrderDialog"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cleanupOldOrders } from "@/components/modules/orders/orderActions"
import { Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { TypographyH2, TypographySmall } from "@/components/ui/typography"
import PaginatedResult from "@/types/paginatedResult"

const sortOrdersByStatus = (a: GetOrdersModel, b: GetOrdersModel) => {
  if (!a.customerStatus && !a.checkerStatus && !a.artistStatus) return -1
  if (!b.customerStatus && !b.checkerStatus && !b.artistStatus) return 1
  return 0
}

export default function SentForPrintingContent() {
  const adminStatus = AdminStatus.SentForPrinting
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
  queryParams.append("page", currentPage.toString())
  queryParams.append("pageSize", "10")
  const apiUrl = `/api/orders/${adminStatus}?${queryParams.toString()}`

  const { data, isLoading, mutate } = useSWR<PaginatedResult<GetOrdersModel>>(
    apiUrl,
    { keepPreviousData: true }
  )

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openResendDialog, setOpenResendDialog] = useState(false)
  const [openSendForPrintingDialog, setOpenSendForPrintingDialog] =
    useState(false)
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<GetOrdersModel>()

  // Cleanup state
  const [isCleanupLoading, setIsCleanupLoading] = useState(false)
  const [openCleanupDialog, setOpenCleanupDialog] = useState(false)
  const { toast } = useToast()

  const handleSearch = useCallback((orderFilters: OrderFiltersModel) => {
    setFilters(orderFilters)
    setCurrentPage(1)
  }, [])

  const handleDelete = (id: number) => {
    const order = data?.items?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }

  const handleResend = (id: number) => {
    const order = data?.items?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenResendDialog(true)
  }

  const handleSendForPrinting = (id: number) => {
    const order = data?.items?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenSendForPrintingDialog(true)
  }

  const handleComplete = (id: number) => {
    const order = data?.items?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenCompleteDialog(true)
  }

  const handleCleanup = async () => {
    setIsCleanupLoading(true)
    try {
      const deletedCount = await cleanupOldOrders(30)
      setOpenCleanupDialog(false)
      toast({
        title: "Cleanup Complete",
        description: `Successfully deleted ${deletedCount} orders.`,
      })
      mutate()
    } catch (error) {
      console.error("Failed to cleanup orders:", error)
      toast({
        title: "Cleanup Failed",
        description: "An error occurred while deleting orders.",
        variant: "destructive",
      })
    } finally {
      setIsCleanupLoading(false)
    }
  }

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <AdminOrdersDataTableActions
        adminStatus={adminStatus}
        order={order}
        onDelete={handleDelete}
        onResend={handleResend}
        onResolve={() => {}}
        onSendForPrinting={handleSendForPrinting}
        onToggleRedrawMark={() => {}}
        onComplete={handleComplete}
      />
    )
  }

  const orders = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const totalPages = data?.totalPages ?? 1

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <TypographyH2 withSeparator>Sent for Printing Orders</TypographyH2>
        <AlertDialog
          open={openCleanupDialog}
          onOpenChange={setOpenCleanupDialog}
        >
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Cleanup Old Orders
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Old Orders?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all orders that have been in
                &quot;Sent for Printing&quot; for more than 30 days. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isCleanupLoading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  handleCleanup()
                }}
                disabled={isCleanupLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isCleanupLoading ? "Deleting..." : "Delete Orders"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

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
          <SendOrderForPrintingDialog
            id={selectedOrder.id}
            open={openSendForPrintingDialog}
            mutate={mutate}
            handleClose={() => setOpenSendForPrintingDialog(false)}
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

      {/* Server-side Pagination Controls */}
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
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
