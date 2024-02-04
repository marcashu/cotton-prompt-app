"use client"

import { acceptOrder } from "@/components/modules/orders/orderActions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function OrderProofButtons({ orderId }: { orderId: number }) {
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
    <div className="self-end">
      <Button variant="outline" className="mr-4">
        Request For Changes
      </Button>
      <Button onClick={handleClick} loading={loading}>
        Accept Proof
      </Button>
    </div>
  )
}
