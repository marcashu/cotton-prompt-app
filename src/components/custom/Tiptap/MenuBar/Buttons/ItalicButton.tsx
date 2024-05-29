import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Italic } from "lucide-react"

export default function ItalicButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      className={editor.isActive("italic") ? activeButtonStyle : ""}
    >
      <Italic />
    </Button>
  )
}
