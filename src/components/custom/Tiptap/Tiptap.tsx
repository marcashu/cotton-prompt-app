"use client"

import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import MenuBar from "./MenuBar"
import styles from "./Tiptap.module.css"
import SaveTiptapButton from "./SaveTiptapButton"

export default function Tiptap({
  content,
  onSave,
}: {
  content: string
  onSave: (content: string) => Promise<void>
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
        content={content}
        slotBefore={<MenuBar />}
        slotAfter={<SaveTiptapButton onSave={onSave} />}
        editorProps={{
          attributes: {
            class: "min-h-[200px] rounded-md border border-input px-3 py-2",
          },
        }}
      >
        <div></div>
      </EditorProvider>
    </div>
  )
}
