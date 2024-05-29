import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Underline } from "lucide-react"

export default function UnderlineButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      disabled={!editor.can().chain().focus().toggleUnderline().run()}
      className={editor.isActive("underline") ? activeButtonStyle : ""}
    >
      <Underline />
    </Button>
  )
}
