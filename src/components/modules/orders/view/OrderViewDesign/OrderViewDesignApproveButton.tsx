import { Button } from "@/components/ui/button"
import { useState } from "react"
import { approveOrder } from "../../orderService"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function OrderViewDesignApproveButton({ id }: { id: number }) {
  const [disabled, setDisabled] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleApprove = () => {
    setDisabled(true)
    approveOrder(id).then(() => {
      toast({
        title: "Order has been approved!",
        description: new Date().toLocaleString(),
      })
      router.back()
    })
  }

  return (
    <Button type="button" disabled={disabled} onClick={handleApprove}>
      Approve
    </Button>
  )
}
