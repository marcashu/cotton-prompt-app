import { Button } from "@/components/ui/button"
import { swapOutputSizes } from "../../_lib/outputSizeActions"
import useSession from "@/hooks/useSession"
import { MoveUp } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function OutputSizeItemMoveUp({
  id,
  leftId,
  readOnly,
  disableAll,
  setDisableAll,
}: {
  id: number
  leftId?: number
  readOnly: boolean
  disableAll: boolean
  setDisableAll: (value: boolean) => void
}) {
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const { toast } = useToast()

  if (!session) return <></>

  const handleMoveUp = () => {
    if (!leftId) return

    setDisableAll(true)
    setLoading(true)
    swapOutputSizes(id, leftId, session.userId)
      .then(() =>
        toast({
          title: "Print color has been moved up successfully",
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
      disabled={!leftId || disableAll}
      onClick={handleMoveUp}
      loading={loading}
    >
      <MoveUp className="h-4 w-4" />
    </Button>
  )
}
