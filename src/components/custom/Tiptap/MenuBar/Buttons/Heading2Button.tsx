import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Heading2 } from "lucide-react"

export default function Heading2Button({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      className={
        editor.isActive("heading", { level: 2 }) ? activeButtonStyle : ""
      }
    >
      <Heading2 />
    </Button>
  )
}
