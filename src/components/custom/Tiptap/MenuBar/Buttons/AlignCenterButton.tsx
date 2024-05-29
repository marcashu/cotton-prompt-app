import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { AlignCenter } from "lucide-react"

export default function AlignCenterButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().setTextAlign("center").run()}
      className={
        editor.isActive({ textAlign: "center" }) ? activeButtonStyle : ""
      }
    >
      <AlignCenter />
    </Button>
  )
}
