"use client"

import { acceptOrder } from "@/components/modules/orders/orderActions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import OrderProofChangeRequestButton from "./OrderProofChangeRequestButton"

export default function OrderProofButtons({
  orderId,
  designId,
}: {
  orderId: number
  designId: number
}) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleClick = () => {
    setLoading(true)
    acceptOrder(orderId)
      .then(() =>
        toast({
          title: "Order proof has been accepted successfully",
          description: "You can now safely close this tab.",
          duration: 60000,
        })
      )
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex flex-col gap-2 pb-4">
      <Button
        onClick={handleClick}
        loading={loading}
        variant="orderProofDefault"
        className="m-auto w-[300px]"
      >
        ACCEPT PROOF
      </Button>
      <OrderProofChangeRequestButton
        orderId={orderId}
        designId={designId}
        disabled={loading}
      />
    </div>
  )
}
