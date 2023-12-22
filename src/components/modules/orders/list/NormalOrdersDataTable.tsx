"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import { normalOrdersKey, ordersColumnDef } from "./ordersListConstants"

export default function NormalOrdersDataTable() {
  const { data, isLoading } = useSWR<GetOrdersModel[]>(normalOrdersKey)

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>Normal Orders</CardTitle>
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
