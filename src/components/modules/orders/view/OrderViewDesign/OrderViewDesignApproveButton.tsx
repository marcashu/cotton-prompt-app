import { Button } from "@/components/ui/button"
import { useState } from "react"
import { approveOrder } from "../../orderService"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function OrderViewDesignApproveButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleApprove = () => {
    setLoading(true)
    approveOrder(id).then(() => {
      toast({
        title: "Order has been approved!",
        description: new Date().toLocaleString(),
      })
      router.back()
    })
  }

  return (
    <Button type="button" loading={loading} onClick={handleApprove}>
      Approve
    </Button>
  )
}
