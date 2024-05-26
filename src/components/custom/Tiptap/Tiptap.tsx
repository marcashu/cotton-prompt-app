"use client"

import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import MenuBar from "./MenuBar"
import styles from "./Tiptap.module.css"
import { cn } from "@/lib/utils"

export default function Tiptap({
  value,
  onChange,
  readOnly,
}: {
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
}) {
  const extensions = [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Underline,
  ]

  return (
    <div className={styles["tiptap-container"]}>
      <EditorProvider
        extensions={extensions}
        content={value}
        editable={!readOnly}
        {...(!readOnly && {
          slotBefore: <MenuBar />,
        })}
        editorProps={{
          attributes: {
            class: cn(
              "min-h-[200px]",
              !readOnly && "border border-input rounded-md px-3 py-2"
            ),
          },
        }}
        {...(onChange && {
          onUpdate: ({ editor }) => onChange(formatHtml(editor.getHTML())),
        })}
      >
        <div></div>
      </EditorProvider>
    </div>
  )
}

const formatHtml = (content: string) => {
  const result = content
    .replaceAll('<p style="', '<p style="margin: 0;')
    .replaceAll("<p>", '<p style="margin: 0">')
  return result
}
