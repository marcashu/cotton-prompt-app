"use client"

import { getOrdersColumnDef } from "./ordersListConstants"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { CellContext } from "@tanstack/react-table"

export default function OrdersDataTable({
  title,
  url,
  actionCell,
  hideWhenEmpty,
}: {
  title: string
  url: string
  actionCell: ({ row }: CellContext<GetOrdersModel, unknown>) => JSX.Element
  hideWhenEmpty?: boolean
}) {
  const { data, isLoading } = useSWR<GetOrdersModel[]>(url)

  if (hideWhenEmpty && !data?.length) return <></>

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={getOrdersColumnDef(actionCell)}
          data={data ?? []}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  )
}
