import { Button } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Undo2 } from "lucide-react"

export default function UndoButton({ editor }: { editor: Editor }) {
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().chain().focus().undo().run()}
    >
      <Undo2 />
    </Button>
  )
}
