"use client"

import { swapDesignBrackets } from "@/components/modules/settings/design-bracket/designBracketActions"
import { Button } from "@/components/ui/button"
import DesignBracket from "@/types/designBracket"
import { MoveDown, MoveUp } from "lucide-react"
import { useState } from "react"
import DesignBracketItemEdit from "./DesignBracketItemEdit"
import DesignBracketItemDelete from "./DesignBracketItemDelete"
import useSession from "@/hooks/useSession"

export default function DesignBracketItem({
  data,
  leftId,
  rightId,
}: {
  data: DesignBracket
  leftId?: number
  rightId?: number
}) {
  const [readOnly, setReadOnly] = useState(true)
  const [disableAll, setDisableAll] = useState(false)
  const { session } = useSession()

  if (!session) return <></>

  const handleMoveUp = () => {
    if (!leftId) return

    setDisableAll(true)
    swapDesignBrackets(data.id, leftId, session.userId).finally(() =>
      setDisableAll(false)
    )
  }

  const handleMoveDown = () => {
    if (!rightId) return

    setDisableAll(true)
    swapDesignBrackets(data.id, rightId, session.userId).finally(() =>
      setDisableAll(false)
    )
  }

  return (
    <li key={data.id} className="flex gap-2">
      <DesignBracketItemEdit
        id={data.id}
        initialValue={data.value}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <DesignBracketItemDelete
        id={data.id}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={!readOnly ? "hidden" : ""}
        disabled={!leftId || disableAll}
        onClick={handleMoveUp}
      >
        <MoveUp className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={!readOnly ? "hidden" : ""}
        disabled={!rightId || disableAll}
        onClick={handleMoveDown}
      >
        <MoveDown className="h-4 w-4" />
      </Button>
    </li>
  )
}
