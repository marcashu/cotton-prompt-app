import { Card } from "@/components/ui/card"
import {
  TypographyH3,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography"
import GetOrderModel from "@/types/getOrderModel"

export default function OrderViewDetails({ order }: { order: GetOrderModel }) {
  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>Details</TypographyH3>
      <div className="flex justify-between max-w-3xl">
        <div>
          <TypographySmall>Priority</TypographySmall>
          <TypographyMuted>{order.priority ? "Yes" : "No"}</TypographyMuted>
        </div>
        <div>
          <TypographySmall>Print Color</TypographySmall>
          <TypographyMuted>{order.printColor.value}</TypographyMuted>
        </div>
        <div>
          <TypographySmall>Design Bracket</TypographySmall>
          <TypographyMuted>{order.designBracket.name}</TypographyMuted>
        </div>
        <div>
          <TypographySmall>Output Size</TypographySmall>
          <TypographyMuted>{order.outputSize.value}</TypographyMuted>
        </div>
      </div>
      <div>
        <TypographySmall>Concept</TypographySmall>
        <TypographyMuted>{order.concept}</TypographyMuted>
      </div>
    </Card>
  )
}
