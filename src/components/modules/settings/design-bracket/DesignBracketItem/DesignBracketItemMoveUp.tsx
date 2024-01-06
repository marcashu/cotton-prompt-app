import { Button } from "@/components/ui/button"
import { swapDesignBrackets } from "../designBracketActions"
import useSession from "@/hooks/useSession"
import { MoveUp } from "lucide-react"
import { useState } from "react"

export default function DesignBracketItemMoveUp({
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

  if (!session) return <></>

  const handleMoveUp = () => {
    if (!leftId) return

    setDisableAll(true)
    setLoading(true)
    swapDesignBrackets(id, leftId, session.userId).finally(() => {
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
