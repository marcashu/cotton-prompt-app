import OrderPageHeader from "@/components/modules/orders/OrderPageHeader"
import { getOrderById } from "@/components/modules/orders/orderService"
import OrderViewDesignUpload from "@/components/modules/orders/view/OrderViewDesignUpload"
import OrderViewDetails from "@/components/modules/orders/view/OrderViewDetails"
import OrderViewImageReferences from "@/components/modules/orders/view/OrderViewImageReferences"

export default async function ViewOrderPage({
  params,
}: {
  params: { id: number }
}) {
  const order = await getOrderById(params.id)

  return (
    <div className="flex flex-col gap-4">
      <OrderPageHeader
        title={`Order ${order.orderNumber}`}
        description="Viewing order details."
      />
      <OrderViewDetails order={order} />
      <OrderViewImageReferences urls={order.imageReferences} />
      <OrderViewDesignUpload id={order.id} />
    </div>
  )
}
