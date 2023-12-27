import { assignArtistToOrder, assignCheckerToOrder } from "../../orderService"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import { getOrderListKey } from "../ordersListHelper"

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

  if (!session || session.userRole === "admin") return <></>

  const handleClaim = () => {
    const assignToOrder =
      session.userRole === "artist" ? assignArtistToOrder : assignCheckerToOrder

    const mutateKey = getOrderListKey(session.userRole, priority)

    assignToOrder(id, session.userId).then(() => {
      mutate(mutateKey)
      toast({
        title: "Order has been claimed successfully",
        description: new Date().toLocaleString(),
      })
    })
  }

  return (
    <Button type="button" onClick={handleClaim}>
      Claim
    </Button>
  )
}
