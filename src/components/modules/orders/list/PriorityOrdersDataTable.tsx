import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import useSWR from "swr"
import GetOrdersModel from "@/types/getOrdersModel"
import { ordersColumnDef, priorityOrdersKey } from "./ordersListConstants"

export default function PriorityOrdersDataTable() {
  const { data, isLoading } = useSWR<GetOrdersModel[]>(priorityOrdersKey)

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
