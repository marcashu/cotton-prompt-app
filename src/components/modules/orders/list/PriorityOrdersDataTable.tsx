"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import { ordersColumnDef, priorityOrdersKey } from "./ordersListConstants"
import useSession from "@/hooks/useSession"

export default function PriorityOrdersDataTable() {
  const { session } = useSession()

  let key = priorityOrdersKey

  if (session?.userRole === "artist") {
    key += "&hasArtistFilter=true"
  }

  const { data, isLoading } = useSWR<GetOrdersModel[]>(key)

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>Priority Orders</CardTitle>
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
