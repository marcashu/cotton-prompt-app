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
  canClaimMutateKey,
}: {
  id: number
  mutateKey: string
  canClaim: CanDoModel
  role: Role
  canClaimMutateKey?: string
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

      assignToOrder(id, session.userId).then((canDo) => {
        setLoading(false)
        mutate(mutateKey)

        if (canDo.canDo) {
          toast({
            title: "Order has been claimed successfully",
            description: new Date().toLocaleString(),
          })

          if (canClaimMutateKey) {
            mutate(canClaimMutateKey)
          }
        } else {
          toast({
            variant: "warning",
            title: "Order claim failed",
            description: canDo.message,
          })
        }
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
