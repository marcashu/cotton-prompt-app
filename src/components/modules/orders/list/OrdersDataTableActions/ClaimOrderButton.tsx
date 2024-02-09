"use client"

import { assignArtistToOrder, assignCheckerToOrder } from "../../orderActions"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import CanDoModel from "@/types/canDoModel"
import Role from "@/enums/role"

export default function ClaimOrderButton({
  id,
  mutateKey,
  canClaim,
  role,
}: {
  id: number
  mutateKey: string
  canClaim: CanDoModel
  role: Role
}) {
  const { session } = useSession()
  const { mutate } = useSWRConfig()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  if (!session) return <></>

  const handleClaim = () => {
    if (canClaim.canDo) {
      setLoading(true)

      const assignToOrder =
        role === Role.Artist ? assignArtistToOrder : assignCheckerToOrder

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
