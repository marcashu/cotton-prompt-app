import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { List } from "lucide-react"

export default function BulletListButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      disabled={!editor.can().chain().focus().toggleBulletList().run()}
      className={editor.isActive("bulletList") ? activeButtonStyle : ""}
    >
      <List />
    </Button>
  )
}
