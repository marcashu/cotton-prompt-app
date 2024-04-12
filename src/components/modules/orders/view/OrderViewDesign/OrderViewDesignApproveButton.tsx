import { Button } from "@/components/ui/button"
import { useState } from "react"
import { approveOrder } from "../../orderActions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { KeyedMutator } from "swr"
import GetOrderModel from "@/types/getOrderModel"

export default function OrderViewDesignApproveButton({
  id,
  mutate,
}: {
  id: number
  mutate: KeyedMutator<GetOrderModel>
}) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleApprove = () => {
    setLoading(true)
    approveOrder(id).then(() => {
      mutate()
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
