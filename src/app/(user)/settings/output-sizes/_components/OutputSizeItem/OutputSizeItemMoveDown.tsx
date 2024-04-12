import { Button } from "@/components/ui/button"
import { swapOutputSizes } from "../../_lib/outputSizeActions"
import useSession from "@/hooks/useSession"
import { MoveDown } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function OutputSizeItemMoveDown({
  id,
  rightId,
  readOnly,
  disableAll,
  setDisableAll,
}: {
  id: number
  rightId?: number
  readOnly: boolean
  disableAll: boolean
  setDisableAll: (value: boolean) => void
}) {
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const { toast } = useToast()

  if (!session) return <></>

  const handleMoveDown = () => {
    if (!rightId) return

    setDisableAll(true)
    setLoading(true)
    swapOutputSizes(id, rightId, session.userId)
      .then(() =>
        toast({
          title: "Print color has been moved down successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => {
        setDisableAll(false)
        setLoading(false)
      })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={!readOnly ? "hidden" : ""}
      disabled={!rightId || disableAll}
      onClick={handleMoveDown}
      loading={loading}
    >
      <MoveDown className="h-4 w-4" />
    </Button>
  )
}
