import { Button } from "@/components/ui/button"
import { useState } from "react"
import { requestReuploadOrder } from "../../orderService"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function OrderViewDesignRequestReuploadButton({
  id,
}: {
  id: number
}) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleRequestReupload = () => {
    setLoading(true)
    requestReuploadOrder(id).then(() => {
      toast({
        title: "Order has been requested for reupload!",
        description: new Date().toLocaleString(),
      })
      router.back()
    })
  }

  return (
    <Button
      type="button"
      className="mr-2"
      loading={loading}
      onClick={handleRequestReupload}
      variant="outline"
    >
      Request Reupload
    </Button>
  )
}
