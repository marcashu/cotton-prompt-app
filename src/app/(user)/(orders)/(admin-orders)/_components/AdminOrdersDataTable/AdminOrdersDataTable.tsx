"use client"

import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import AdminOrderFilters from "./AdminOrderFilters"
import { useState } from "react"
import { CellContext } from "@tanstack/react-table"
import getAdminOrdersColumnDef from "../../_lib/adminOrdersColumnDef"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DeleteOrderDialog from "@/components/modules/orders/list/OrdersDataTableActions/DeleteOrderDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import ArtistStatus from "@/enums/artistStatus"

export default function AdminOrdersDataTable({
  isOngoing,
}: {
  isOngoing: boolean
}) {
  const baseUrl = `/api/orders/${isOngoing ? "ongoing" : "completed"}`
  const [url, setUrl] = useState(baseUrl)
  const { data, isLoading, mutate } = useSWR<GetOrdersModel[]>(url)
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(0)

  const handleSearch = (orderNumber?: string) => {
    setUrl(`${baseUrl}?orderNumber=${orderNumber}`)
  }

  const actionCell = ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={`/view-order/${order.id}`}>View</Link>
          </DropdownMenuItem>
          {isOngoing && (
            <>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={`/edit-order/${order.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setDeleteId(order.id)
                  setOpen(true)
                }}
              >
                Delete
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            disabled={order.artistStatus === ArtistStatus.Claimed}
            className="cursor-pointer"
            asChild
          >
            <Link
              href={`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/${order.id}/download`}
              target="_blank"
              prefetch={false}
            >
              Download
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
