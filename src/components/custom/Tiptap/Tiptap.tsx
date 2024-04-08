"use client"

import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import MenuBar from "./MenuBar"
import styles from "./Tiptap.module.css"
import SaveTiptapButton from "./SaveTiptapButton"
import { useState } from "react"

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
  const [error, setError] = useState(false)

  return (
    <div className={styles["tiptap-container"]}>
      <EditorProvider
        extensions={extensions}
        content={content}
        slotBefore={<MenuBar />}
        slotAfter={
          <>
            {error && (
              <p className="text-sm font-medium text-destructive mt-2">
                {
                  "Email should contain {link} as placeholder for the order proof URL."
                }
              </p>
            )}
            <SaveTiptapButton onSave={onSave} disabled={error} />
          </>
        }
        editorProps={{
          attributes: {
            class: "min-h-[200px] rounded-md border border-input px-3 py-2",
          },
        }}
        onUpdate={(props) => {
          const content = props.editor.getHTML()
          setError(!content.includes("{link}"))
        }}
      >
        <div></div>
      </EditorProvider>
    </div>
  )
}
