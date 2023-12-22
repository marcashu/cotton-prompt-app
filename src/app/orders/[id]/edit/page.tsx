import OrderForm from "@/components/modules/orders/form/OrderForm"
import { getOrderById } from "@/components/modules/orders/orderService"
import OrderPageHeader from "@/components/modules/orders/OrderPageHeader"

export default async function EditOrderPage({
  params,
}: {
  params: { id: number }
}) {
  const order = await getOrderById(params.id)

  return (
    <div>
      <OrderPageHeader title="Edit Order" description="Edit this order." />
      <OrderForm order={order} />
    </div>
  )
}
