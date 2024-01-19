"use client"

import OutputSize from "@/types/outputSize"
import { useState } from "react"
import OutputSizeItemEdit from "./OutputSizeItemEdit"
import OutputSizeItemDelete from "./OutputSizeItemDelete"
import OutputSizeItemMoveUp from "./OutputSizeItemMoveUp"
import OutputSizeItemMoveDown from "./OutputSizeItemMoveDown"

export default function OutputSizeItem({
  data,
  leftId,
  rightId,
}: {
  data: OutputSize
  leftId?: number
  rightId?: number
}) {
  const [readOnly, setReadOnly] = useState(true)
  const [disableAll, setDisableAll] = useState(false)

  return (
    <li key={data.id} className="flex gap-2">
      <OutputSizeItemEdit
        id={data.id}
        initialValue={data.value}
        readOnly={readOnly}
        setReadOnly={setReadOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <OutputSizeItemDelete
        id={data.id}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <OutputSizeItemMoveUp
        id={data.id}
        leftId={leftId}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
      <OutputSizeItemMoveDown
        id={data.id}
        rightId={rightId}
        readOnly={readOnly}
        disableAll={disableAll}
        setDisableAll={setDisableAll}
      />
    </li>
  )
}
