"use client"

import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import AdminOrderFilters from "./AdminOrderFilters"
import { useState } from "react"
import { CellContext } from "@tanstack/react-table"
import getAdminOrdersColumnDef from "../../_lib/adminOrdersColumnDef"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"
import AdminOrdersDataTableActions from "./AdminOrdersDataTableActions"
import ResendOrderForCustomerReviewDialog from "./ResendOrderForCustomerReviewDialog"
import AdminStatus from "@/enums/adminStatus"
import ResolveOrderDialog from "./ResolveOrderDialog"
import SendOrderForPrintingDialog from "./SendOrderForPrintingDialog"
import OrderFiltersModel from "@/types/orderFiltersModel"

export default function AdminOrdersDataTable({
  adminStatus,
}: {
  adminStatus: AdminStatus
}) {
  const baseUrl = `/api/orders/${adminStatus}`
  const [url, setUrl] = useState(baseUrl)
  const { data, isLoading, mutate } = useSWR<GetOrdersModel[]>(url)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openResendDialog, setOpenResendDialog] = useState(false)
  const [openResolveDialog, setOpenResolveDialog] = useState(false)
  const [openSendForPrintingDialog, setOpenSendForPrintingDialog] =
    useState(false)
  const [selectedOrder, setSelectedOrder] = useState<GetOrdersModel>()

  const handleSearch = (orderFilters: OrderFiltersModel) => {
    const queryParams = new URLSearchParams()

    Object.keys(orderFilters).forEach((filterKey) => {
      const filterValue = orderFilters[filterKey as keyof OrderFiltersModel]
      if (filterValue.length) {
        queryParams.append(filterKey, filterValue.join(","))
      }
    })

    const newUrl = `${baseUrl}?${queryParams.toString()}`
    if (url !== newUrl) setUrl(newUrl)
  }

  const handleDelete = (id: number) => {
    const order = data?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenDeleteDialog(true)
  }

  const handleResend = (id: number) => {
    const order = data?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenResendDialog(true)
  }

  const handleResolve = (id: number) => {
    const order = data?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenResolveDialog(true)
  }

  const handleSendForPrinting = (id: number) => {
    const order = data?.find((o) => o.id === id)
    setSelectedOrder(order)
    setOpenSendForPrintingDialog(true)
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
        </>
      )}
      <AdminOrderFilters
        count={data?.length ?? 0}
        adminStatus={adminStatus}
        onSearch={handleSearch}
      />
      <DataTable
        columns={getAdminOrdersColumnDef(adminStatus, actionCell)}
        data={data ?? []}
        isLoading={isLoading}
      />
    </>
  )
}
