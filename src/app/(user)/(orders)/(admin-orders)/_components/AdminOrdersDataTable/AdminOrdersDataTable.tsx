"use client"

import { DataTable } from "@/components/ui/data-table"
import adminOrdersColumnDef from "../../_lib/adminOrdersColumnDef"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import AdminOrderFilters from "./AdminOrderFilters"
import { useState } from "react"
import { CellContext } from "@tanstack/react-table"
import getAdminOrdersColumnDef from "../../_lib/adminOrdersColumnDef"

export default function AdminOrdersDataTable({
  baseUrl,
  actionCell,
}: {
  baseUrl: string
  actionCell: ({ row }: CellContext<GetOrdersModel, unknown>) => JSX.Element
}) {
  const [url, setUrl] = useState(baseUrl)
  const { data, isLoading } = useSWR<GetOrdersModel[]>(url)

  const handleSearch = (orderNumber?: string) => {
    setUrl(`${baseUrl}?orderNumber=${orderNumber}`)
  }

  return (
    <>
      <AdminOrderFilters onSearch={handleSearch} />
      <DataTable
        columns={getAdminOrdersColumnDef(actionCell)}
        data={data ?? []}
        isLoading={isLoading}
      />
    </>
  )
}
