import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import ordersColumnDef from "./ordersColumnDef"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"

export default function NormalOrdersDataTable() {
  const { data, isLoading } = useSWR<GetOrdersModel[]>(
    `/api/orders?priority=false`
  )

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
