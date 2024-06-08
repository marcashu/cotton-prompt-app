import { useEffect, useState } from "react"
import OrderNumberFilter from "./OrderNumberFilter"
import GetOrdersModel from "@/types/getOrdersModel"
import OrderFiltersModel from "@/types/orderFiltersModel"
import AdminStatus from "@/enums/adminStatus"
import useSWR from "swr"
import PriorityFilter from "./PriorityFilter"

export default function AdminOrderFilters({
  adminStatus,
  onSearch,
}: {
  adminStatus: AdminStatus
  onSearch: (orderFilters: OrderFiltersModel) => void
}) {
  const { data } = useSWR<GetOrdersModel[]>(`/api/orders/${adminStatus}`)
  const [orderFilters, setOrderFilters] = useState<OrderFiltersModel>({
    orderNumbers: [],
    priorities: [],
  })

  useEffect(() => {
    onSearch(orderFilters)
  }, [onSearch, orderFilters])

  return (
    <div className="flex gap-2">
      <OrderNumberFilter
        data={data}
        values={orderFilters.orderNumbers}
        onSelect={setOrderFilters}
      />
      <PriorityFilter
        values={orderFilters.priorities}
        onSelect={setOrderFilters}
      />
    </div>
  )
}
