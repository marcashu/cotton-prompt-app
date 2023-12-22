"use client"

import useSession from "@/hooks/useSession"
import {
  normalOrdersKey,
  ordersColumnDef,
  priorityOrdersKey,
} from "./ordersListConstants"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"

export default function OrdersDataTable({ priority }: { priority: boolean }) {
  const { session } = useSession()

  let key = priority ? priorityOrdersKey : normalOrdersKey

  if (session?.userRole === "artist") {
    key += "&hasArtistFilter=true"
  }

  const { data, isLoading } = useSWR<GetOrdersModel[]>(key)

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
