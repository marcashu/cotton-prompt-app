"use client"

import { EditorProvider } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import MenuBar from "./MenuBar"
import styles from "./Tiptap.module.css"

export default function Tiptap({
  value,
  error,
  errorMessage,
  onChange,
}: {
  value: string
  error: boolean
  errorMessage: string
  onChange: (value: string) => void
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
        slotBefore={<MenuBar />}
        slotAfter={
          <>
            {error && (
              <p className="text-sm font-medium text-destructive mt-2">
                {errorMessage}
              </p>
            )}
          </>
        }
        editorProps={{
          attributes: {
            class: "min-h-[200px] rounded-md border border-input px-3 py-2",
          },
        }}
        onUpdate={(props) => {
          const content = formatHtml(props.editor.getHTML())
          onChange(content)
        }}
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
