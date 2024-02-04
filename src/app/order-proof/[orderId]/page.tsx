import Main from "@/app/(user)/_components/Main"
import { getOrderById } from "@/components/modules/orders/orderService"
import OrderViewDesignPreview from "@/components/modules/orders/view/OrderViewDesign/OrderViewDesignPreview"
import { TypographyH2, TypographyMuted } from "@/components/ui/typography"
import OrderProofButtons from "./_components/OrderProofButtons"

export default async function OrderProofPage({
  params,
}: {
  params: { orderId: number }
}) {
  const orderId = params.orderId
  const order = await getOrderById(orderId)

  return (
    <Main className="pt-4">
      <div className="flex flex-col gap-4">
        <TypographyH2>Order {order.orderNumber}</TypographyH2>
        {!order.customerStatus && <OrderProofButtons orderId={orderId} />}
        <div>
          <OrderViewDesignPreview url={order.design?.url} />
          <TypographyMuted className="italic">
            Tip: Click on the image to toggle fullscreen
          </TypographyMuted>
        </div>
      </div>
    </Main>
  )
}
