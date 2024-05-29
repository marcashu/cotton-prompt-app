import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Bold } from "lucide-react"

export default function BoldButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className={editor.isActive("bold") ? activeButtonStyle : ""}
    >
      <Bold />
    </Button>
  )
}
