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

export default function AdminOrdersDataTable({
  adminStatus,
}: {
  adminStatus: "ongoing" | "rejected" | "completed"
}) {
  const baseUrl = `/api/orders/${adminStatus}`
  const [url, setUrl] = useState(baseUrl)
  const { data, isLoading, mutate } = useSWR<GetOrdersModel[]>(url)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openResendDialog, setOpenResendDialog] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(0)

  const handleSearch = (orderNumber?: string) => {
    setUrl(`${baseUrl}?orderNumber=${orderNumber}`)
  }

  const handleDelete = (id: number) => {
    setSelectedOrderId(id)
    setOpenDeleteDialog(true)
  }

  const handleResend = (id: number) => {
    setSelectedOrderId(id)
    setOpenResendDialog(true)
  }

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <AdminOrdersDataTableActions
        adminStatus={adminStatus}
        order={order}
        onDelete={handleDelete}
        onResend={handleResend}
      />
    )
  }

  return (
    <>
      <DeleteOrderDialog
        id={selectedOrderId}
        open={openDeleteDialog}
        mutate={mutate}
        handleClose={() => setOpenDeleteDialog(false)}
      />
      <ResendOrderForCustomerReviewDialog
        id={selectedOrderId}
        open={openResendDialog}
        mutate={mutate}
        handleClose={() => setOpenResendDialog(false)}
        adminStatus={adminStatus}
      />
      <AdminOrderFilters onSearch={handleSearch} />
      <DataTable
        columns={getAdminOrdersColumnDef(actionCell)}
        data={data ?? []}
        isLoading={isLoading}
      />
    </>
  )
}
