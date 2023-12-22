"use client"

import { ordersColumnDef } from "./ordersListConstants"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"

export default function OrdersDataTable({
  priority,
  url,
}: {
  priority: boolean
  url: string
}) {
  const { data, isLoading } = useSWR<GetOrdersModel[]>(url)

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>{`${priority ? "Priority" : "Normal"} Orders`}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={ordersColumnDef}
          data={data ?? []}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  )
}
