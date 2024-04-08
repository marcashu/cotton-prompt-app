import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCurrentEditor } from "@tiptap/react"
import { useState } from "react"

export default function SaveTiptapButton({
  onSave,
}: {
  onSave: (content: string) => Promise<void>
}) {
  const { editor } = useCurrentEditor()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  if (!editor) {
    return <></>
  }

  const handleSave = () => {
    setLoading(true)
    const content = formatHtml(editor.getHTML())
    onSave(content)
      .then(() =>
        toast({
          title: "Email Template has been saved successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => setLoading(false))
  }

  return (
    <Button className="mt-4" onClick={handleSave} loading={loading}>
      Save
    </Button>
  )
}

const formatHtml = (content: string) => {
  const result = content
    .replaceAll('<p style="', '<p style="margin: 0;')
    .replaceAll("<p>", '<p style="margin: 0">')
  return result
}
