import { assignArtistToOrder, assignCheckerToOrder } from "../../orderActions"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import { getOrderListKey } from "../ordersListHelper"
import { useState } from "react"

export default function ClaimOrderButton({
  id,
  priority,
}: {
  id: number
  priority: boolean
}) {
  const { session } = useSession()
  const { mutate } = useSWRConfig()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  if (!session || session.userRole === "admin") return <></>

  const handleClaim = () => {
    setLoading(true)

    const assignToOrder =
      session.userRole === "artist" ? assignArtistToOrder : assignCheckerToOrder

    const mutateKey = getOrderListKey(session.userRole, priority)

    assignToOrder(id, session.userId).then(() => {
      setLoading(false)
      mutate(mutateKey)
      toast({
        title: "Order has been claimed successfully",
        description: new Date().toLocaleString(),
      })
    })
  }

  return (
    <Button type="button" onClick={handleClaim} loading={loading}>
      Claim
    </Button>
  )
}
