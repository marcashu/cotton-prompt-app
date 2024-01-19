"use client"

import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import { columnDef } from "../../_lib/constants"

export default function YourOrdersDataTable({ url }: { url: string }) {
  const { data, isLoading } = useSWR<GetOrdersModel[]>(url)

  return (
    <DataTable columns={columnDef} data={data ?? []} isLoading={isLoading} />
  )
}
