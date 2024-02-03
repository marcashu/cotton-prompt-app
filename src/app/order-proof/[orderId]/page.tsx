import Main from "@/app/(user)/_components/Main"
import { getOrderById } from "@/components/modules/orders/orderService"
import OrderViewDesignPreview from "@/components/modules/orders/view/OrderViewDesign/OrderViewDesignPreview"
import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyMuted } from "@/components/ui/typography"

export default async function OrderProofPage({
  params,
}: {
  params: { orderId: number }
}) {
  const order = await getOrderById(params.orderId)

  return (
    <Main className="pt-4">
      <div className="flex flex-col gap-4">
        <TypographyH2>Order {order.orderNumber}</TypographyH2>
        <div className="self-end">
          <Button variant="outline" className="mr-4">
            Request For Changes
          </Button>
          <Button>Accept Proof</Button>
        </div>
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
