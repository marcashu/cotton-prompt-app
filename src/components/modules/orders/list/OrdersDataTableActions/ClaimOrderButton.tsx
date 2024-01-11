"use client"

import { assignArtistToOrder, assignCheckerToOrder } from "../../orderActions"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import { getOrderListKey } from "../ordersListHelper"
import { useState } from "react"
import CanArtistClaimModel from "@/types/canArtistClaimModel"

export default function ClaimOrderButton({
  id,
  priority,
  canClaim,
}: {
  id: number
  priority: boolean
  canClaim: CanArtistClaimModel
}) {
  const { session } = useSession()
  const { mutate } = useSWRConfig()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  if (!session) return <></>

  const handleClaim = () => {
    if (canClaim.canClaim) {
      setLoading(true)

      const assignToOrder =
        session.userRole === "artist"
          ? assignArtistToOrder
          : assignCheckerToOrder

      const mutateKey = getOrderListKey(session.userRole, priority)

      assignToOrder(id, session.userId).then(() => {
        setLoading(false)
        mutate(mutateKey)
        toast({
          title: "Order has been claimed successfully",
          description: new Date().toLocaleString(),
        })
      })
    } else {
      toast({
        title: "Claim order failed",
        description: canClaim.message,
        variant: "warning",
      })
    }
  }

  return (
    <Button type="button" onClick={handleClaim} loading={loading}>
      Claim
    </Button>
  )
}
