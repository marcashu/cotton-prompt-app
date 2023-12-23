import OrderPageHeader from "@/components/modules/orders/OrderPageHeader"
import { getOrderById } from "@/components/modules/orders/orderService"
import OrderViewImageReferences from "@/components/modules/orders/view/OrderViewImageReferences"
import { Card } from "@/components/ui/card"
import {
  TypographyH3,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography"

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
      <Card className="py-6 container shadow flex flex-col gap-4">
        <TypographyH3>Details</TypographyH3>
        <div className="flex justify-between max-w-3xl">
          <div>
            <TypographySmall>Priority</TypographySmall>
            <TypographyMuted>{order.priority ? "Yes" : "No"}</TypographyMuted>
          </div>
          <div>
            <TypographySmall>Print Color</TypographySmall>
            <TypographyMuted>{order.printColor}</TypographyMuted>
          </div>
          <div>
            <TypographySmall>Design Bracket</TypographySmall>
            <TypographyMuted>${order.designBracket.value}</TypographyMuted>
          </div>
        </div>
        <div>
          <TypographySmall>Concept</TypographySmall>
          <TypographyMuted>{order.concept}</TypographyMuted>
        </div>
      </Card>
      <OrderViewImageReferences urls={order.imageReferences} />
    </div>
  )
}
