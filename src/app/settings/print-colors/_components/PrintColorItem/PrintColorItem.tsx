"use client"

import PrintColor from "@/types/printColor"
import { useState } from "react"
import PrintColorItemEdit from "./PrintColorItemEdit"
import PrintColorItemDelete from "./PrintColorItemDelete"
import PrintColorItemMoveUp from "./PrintColorItemMoveUp"
import PrintColorItemMoveDown from "./PrintColorItemMoveDown"

export default function PrintColorItem({
  data,
  leftId,
  rightId,
}: {
  data: PrintColor
  leftId?: number
  rightId?: number
}) {
  const [readOnly, setReadOnly] = useState(true)
  const [disableAll, setDisableAll] = useState(false)

  return (
    <li key={data.id} className="flex gap-2">
      <PrintColorItemEdit
        id={data.id}
        initialValue={data.value}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <PrintColorItemDelete
        id={data.id}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <PrintColorItemMoveUp
        id={data.id}
        leftId={leftId}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <PrintColorItemMoveDown
        id={data.id}
        rightId={rightId}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
    </li>
  )
}
