import OrdersDataTable from "@/components/modules/orders/list/OrdersDataTable"
import {
  normalArtistAvailableOrdersKey,
  priorityArtistAvailableOrdersKey,
} from "@/components/modules/orders/list/ordersListConstants"
import { TypographyH2 } from "@/components/ui/typography"

export default function AvailableOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Available Orders</TypographyH2>
      <OrdersDataTable priority={true} url={priorityArtistAvailableOrdersKey} />
      <OrdersDataTable priority={false} url={normalArtistAvailableOrdersKey} />
    </div>
  )
}
