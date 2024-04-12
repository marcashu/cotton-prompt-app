"use client"

import Tiptap from "@/components/custom/Tiptap"

export default function EmailTemplatesForm({
  content,
  onSave,
}: {
  content: string
  onSave: (content: string) => Promise<void>
}) {
  return (
    <div>
      <Tiptap content={content} onSave={onSave} />
    </div>
  )
}
