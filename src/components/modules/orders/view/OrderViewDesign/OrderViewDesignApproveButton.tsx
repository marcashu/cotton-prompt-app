import { Button } from "@/components/ui/button"
import useSession from "@/hooks/useSession"
import { useState } from "react"
import { approveOrder } from "../../orderService"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function OrderViewDesignApproveButton({ id }: { id: number }) {
  const { session } = useSession()
  const [disabled, setDisabled] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  if (!session) return <></>

  const handleApprove = () => {
    setDisabled(true)
    approveOrder(id, session.userId).then(() => {
      toast({
        title: "Order has been approved!",
        description: new Date().toLocaleString(),
      })
      router.back()
    })
  }

  return (
    <Button
      type="button"
      className="self-end"
      disabled={disabled}
      onClick={handleApprove}
    >
      Approve
    </Button>
  )
}
