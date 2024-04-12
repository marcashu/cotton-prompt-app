import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Heading3 } from "lucide-react"

export default function Heading3Button({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      className={
        editor.isActive("heading", { level: 3 }) ? activeButtonStyle : ""
      }
    >
      <Heading3 />
    </Button>
  )
}
