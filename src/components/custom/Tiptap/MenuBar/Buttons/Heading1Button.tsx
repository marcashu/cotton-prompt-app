import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { Heading1 } from "lucide-react"

export default function Heading1Button({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      className={
        editor.isActive("heading", { level: 1 }) ? activeButtonStyle : ""
      }
    >
      <Heading1 />
    </Button>
  )
}
