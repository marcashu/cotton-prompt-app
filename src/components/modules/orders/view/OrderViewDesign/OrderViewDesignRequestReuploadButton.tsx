import { Button } from "@/components/ui/button"
import { useState } from "react"
import { requestReuploadOrder } from "../../orderActions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function OrderViewDesignRequestReuploadButton({
  id,
  artistId,
}: {
  id: number
  artistId: string
}) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleRequestReupload = () => {
    setLoading(true)
    requestReuploadOrder(id, artistId).then(() => {
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
