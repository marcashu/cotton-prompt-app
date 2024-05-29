import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { AlignRight } from "lucide-react"

export default function AlignRightButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().setTextAlign("right").run()}
      className={
        editor.isActive({ textAlign: "right" }) ? activeButtonStyle : ""
      }
    >
      <AlignRight />
    </Button>
  )
}
