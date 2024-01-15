import OrderPageHeader from "@/components/modules/orders/OrderPageHeader"
import { getOrderById } from "@/components/modules/orders/orderService"
import OrderViewDesign from "@/components/modules/orders/view/OrderViewDesign"
import OrderViewDetails from "@/components/modules/orders/view/OrderViewDetails"
import OrderViewImageReferences from "@/components/modules/orders/view/OrderViewImageReferences"
import OrderViewPreviousDesigns from "@/components/modules/orders/view/OrderViewPreviousDesigns"

export default async function ViewOrderPage({
  params,
}: {
  params: { id: number }
}) {
  const order = await getOrderById(params.id)

  return (
    <div className="grid grid-cols-2 gap-4">
      <OrderPageHeader
        title={`Order ${order.orderNumber}`}
        description="Viewing order details."
      />
      <OrderViewDetails order={order} />
      <OrderViewImageReferences urls={order.imageReferences} />
      <OrderViewDesign order={order} />
      {order.previousDesigns.length > 0 && (
        <OrderViewPreviousDesigns designs={order.previousDesigns} />
      )}
    </div>
  )
}
