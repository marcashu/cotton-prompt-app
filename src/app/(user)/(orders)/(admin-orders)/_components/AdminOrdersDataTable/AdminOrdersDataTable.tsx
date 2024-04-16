"use client"

import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import AdminOrderFilters from "./AdminOrderFilters"
import { useState } from "react"
import { CellContext } from "@tanstack/react-table"
import getAdminOrdersColumnDef from "../../_lib/adminOrdersColumnDef"
import ViewOrderButton from "../../../_components/ViewOrderButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"

export default function AdminOrdersDataTable({
  isOngoing,
}: {
  isOngoing: boolean
}) {
  const baseUrl = `/api/orders/${isOngoing ? "ongoing" : "completed"}`
  const [url, setUrl] = useState(baseUrl)
  const { data, isLoading, mutate } = useSWR<GetOrdersModel[]>(url)

  const handleSearch = (orderNumber?: string) => {
    setUrl(`${baseUrl}?orderNumber=${orderNumber}`)
  }

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <div className="flex gap-2 justify-end">
        <ViewOrderButton id={order.id} variant="outline" />
        {isOngoing ? (
          <>
            <Button variant="outline" asChild>
              <Link href={`/edit-order/${order.id}`}>Edit</Link>
            </Button>
            <DeleteOrderDialog id={order.id} mutate={mutate} />
          </>
        ) : (
          <Button variant="outline" asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/${order.id}/download`}
              target="_blank"
              prefetch={false}
            >
              Download
            </Link>
          </Button>
        )}
      </div>
    )
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
