"use client"

import PageHeaderWithBack from "@/app/(user)/_components/PageHeaderWithBack"
import OrderViewDesign from "@/components/modules/orders/view/OrderViewDesign"
import OrderViewDetails from "@/components/modules/orders/view/OrderViewDetails"
import OrderViewImageReferences from "@/components/modules/orders/view/OrderViewImageReferences"
import OrderViewPreviousDesigns from "@/components/modules/orders/view/OrderViewPreviousDesigns"
import GetOrderModel from "@/types/getOrderModel"
import useSWR from "swr"

export default function ViewOrderPage({ params }: { params: { id: number } }) {
  const {
    data: order,
    isLoading,
    mutate,
  } = useSWR<GetOrderModel>(`/api/orders/${params.id}`)

  if (isLoading || !order) return <></>

  return (
    <div className="grid grid-cols-2 gap-4">
      <PageHeaderWithBack
        title={`Order ${order.orderNumber}`}
        description="Viewing order details."
      />
      <OrderViewDetails order={order} />
      <OrderViewImageReferences urls={order.imageReferences} />
      <OrderViewDesign order={order} mutate={mutate} />
      {order.previousDesigns.length > 0 && (
        <OrderViewPreviousDesigns
          designs={order.previousDesigns}
          artistStatus={order.artistStatus}
        />
      )}
    </div>
  )
}
