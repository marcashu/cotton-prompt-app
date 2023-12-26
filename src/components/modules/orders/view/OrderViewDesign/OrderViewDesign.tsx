"use client"

import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyMuted } from "@/components/ui/typography"
import OrderViewDesignUpload from "./OrderViewDesignUpload"
import GetOrderModel from "@/types/getOrderModel"

export default function OrderViewDesign({ order }: { order: GetOrderModel }) {
  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>
        Designs
        <TypographyMuted>Upload your design</TypographyMuted>
      </TypographyH3>
      <OrderViewDesignUpload order={order} />
    </Card>
  )
}
