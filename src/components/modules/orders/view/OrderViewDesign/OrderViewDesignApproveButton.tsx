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
  isAdminApproval,
  approvedBy,
}: {
  id: number
  mutate: KeyedMutator<GetOrderModel>
  isAdminApproval?: boolean
  approvedBy?: string
}) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleApprove = () => {
    setLoading(true)
    approveOrder(id, approvedBy, isAdminApproval ?? false).then(() => {
      mutate()
      toast({
        title: isAdminApproval ? "Order approved by admin!" : "Order has been approved!",
        description: new Date().toLocaleString(),
      })
      router.back()
    })
  }

  return (
    <Button type="button" loading={loading} onClick={handleApprove}>
      {isAdminApproval ? "Approve as Admin" : "Approve"}
    </Button>
  )
}
