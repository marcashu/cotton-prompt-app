import { Button } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Redo2 } from "lucide-react"

export default function RedoButton({ editor }: { editor: Editor }) {
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().chain().focus().redo().run()}
    >
      <Redo2 />
    </Button>
  )
}
