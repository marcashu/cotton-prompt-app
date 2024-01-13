"use client"

import { assignArtistToOrder, assignCheckerToOrder } from "../../orderActions"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import { getOrderListKey } from "../ordersListHelper"
import { useState } from "react"
import CanArtistClaimModel from "@/types/canArtistClaimModel"
import Role from "@/types/role"

export default function ClaimOrderButton({
  id,
  priority,
  canClaim,
  role,
}: {
  id: number
  priority: boolean
  canClaim: CanArtistClaimModel
  role: Role
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
        role === "artist" ? assignArtistToOrder : assignCheckerToOrder

      const mutateKey = getOrderListKey(role, priority)

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
