import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { AlignLeft } from "lucide-react"

export default function AlignLeftButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().setTextAlign("left").run()}
      className={
        editor.isActive({ textAlign: "left" }) ? activeButtonStyle : ""
      }
    >
      <AlignLeft />
    </Button>
  )
}
