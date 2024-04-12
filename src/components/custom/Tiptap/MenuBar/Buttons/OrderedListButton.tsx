import { Button, buttonVariants } from "@/components/ui/button"
import { Editor } from "@tiptap/react"
import { ListOrdered } from "lucide-react"

export default function OrderedListButton({ editor }: { editor: Editor }) {
  const activeButtonStyle = buttonVariants({ variant: "default", size: "icon" })

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      disabled={!editor.can().chain().focus().toggleOrderedList().run()}
      className={editor.isActive("orderedList") ? activeButtonStyle : ""}
    >
      <ListOrdered />
    </Button>
  )
}
