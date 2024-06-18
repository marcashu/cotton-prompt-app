"use client"

import PageHeaderWithBack from "@/app/(user)/_components/PageHeaderWithBack"
import OrderViewDesign from "@/components/modules/orders/view/OrderViewDesign"
import OrderViewDetails from "@/components/modules/orders/view/OrderViewDetails"
import OrderViewImageReferences from "@/components/modules/orders/view/OrderViewImageReferences"
import OrderViewPreviousDesigns from "@/components/modules/orders/view/OrderViewPreviousDesigns"
import GetOrderModel from "@/types/getOrderModel"
import useSWR from "swr"
import ReportOrderDialog from "./_components/ReportOrderDialog"
import useSession from "@/hooks/useSession"
import Role from "@/enums/role"
import CheckerStatus from "@/enums/checkerStatus"

export default function ViewOrderPage({ params }: { params: { id: number } }) {
  const {
    data: order,
    isLoading,
    mutate,
  } = useSWR<GetOrderModel>(`/api/orders/${params.id}`)
  const { session } = useSession()

  if (!session || isLoading || !order) return <></>

  const canReportOrder =
    session.selectedRole === Role.Artist &&
    order.checkerStatus !== CheckerStatus.Approved

  return (
    <div className="grid grid-cols-2 gap-4">
      <PageHeaderWithBack
        title={`Order ${order.orderNumber}`}
        description="Viewing order details."
        {...(canReportOrder && {
          action: <ReportOrderDialog id={order.id} />,
        })}
      />
      <OrderViewDetails order={order} />
      <OrderViewImageReferences
        urls={order.imageReferences.map((ir) => ir.value)}
      />
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
