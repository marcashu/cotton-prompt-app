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

export default function AdminOrdersDataTable({
  adminStatus,
}: {
  adminStatus: "ongoing" | "rejected" | "completed"
}) {
  const baseUrl = `/api/orders/${adminStatus}`
  const [url, setUrl] = useState(baseUrl)
  const { data, isLoading, mutate } = useSWR<GetOrdersModel[]>(url)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(0)

  const handleSearch = (orderNumber?: string) => {
    setUrl(`${baseUrl}?orderNumber=${orderNumber}`)
  }

  const handleDelete = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <AdminOrdersDataTableActions
        adminStatus={adminStatus}
        order={order}
        onDelete={handleDelete}
      />
    )
  }

  return (
    <>
      <DeleteOrderDialog
        id={deleteId}
        open={open}
        mutate={mutate}
        handleClose={() => setOpen(false)}
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
