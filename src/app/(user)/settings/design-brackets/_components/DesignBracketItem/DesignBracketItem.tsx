"use client"

import DesignBracket from "@/types/designBracket"
import { useState } from "react"
import DesignBracketItemEdit from "./DesignBracketItemEdit"
import DesignBracketItemDelete from "./DesignBracketItemDelete"
import DesignBracketItemMoveUp from "./DesignBracketItemMoveUp"
import DesignBracketItemMoveDown from "./DesignBracketItemMoveDown"

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

  return (
    <li key={data.id} className="flex gap-2">
      <DesignBracketItemEdit
        id={data.id}
        initialValue={data}
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
      <DesignBracketItemMoveUp
        id={data.id}
        leftId={leftId}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <DesignBracketItemMoveDown
        id={data.id}
        rightId={rightId}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
    </li>
  )
}
