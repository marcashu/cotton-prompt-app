import { Button } from "@/components/ui/button"
import { swapDesignBrackets } from "../designBracketActions"
import useSession from "@/hooks/useSession"
import { MoveDown } from "lucide-react"
import { useState } from "react"

export default function DesignBracketItemMoveDown({
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

  if (!session) return <></>

  const handleMoveDown = () => {
    if (!rightId) return

    setDisableAll(true)
    setLoading(true)
    swapDesignBrackets(id, rightId, session.userId).finally(() => {
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
