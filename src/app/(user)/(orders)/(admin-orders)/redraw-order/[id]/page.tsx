import OrderForm from "@/components/modules/orders/form/OrderForm"
import { getOrderById } from "@/components/modules/orders/orderService"
import PageHeaderWithBack from "@/app/(user)/_components/PageHeaderWithBack"

export default async function RedrawOrderPage({
  params,
}: {
  params: { id: number }
}) {
  const order = await getOrderById(params.id)

  return (
    <div>
      <PageHeaderWithBack title="Edit Order" description="Edit this order." />
      <OrderForm order={order} isRedraw />
    </div>
  )
}
