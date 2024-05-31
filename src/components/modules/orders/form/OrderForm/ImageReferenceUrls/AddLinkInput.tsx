import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ImageReferenceUpload from "@/types/imageReferenceUpload"
import { useState } from "react"
import * as z from "zod"

export default function AddLinkInput({
  onSubmit,
}: {
  onSubmit: (value: ImageReferenceUpload) => void
}) {
  const [link, setLink] = useState("")
  const [error, setError] = useState("")

  return (
    <div className="grow">
      <div className="flex gap-1 ">
        <Input value={link} onChange={(e) => setLink(e.target.value)} />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (!link) {
              setError("Please enter link.")
              return
            }

            if (!z.string().url().safeParse(link).success) {
              setError("Please enter a valid URL.")
              return
            }

            setError("")

            const item: ImageReferenceUpload = {
              value: link,
              type: "Link",
              name: "Link",
            }

            onSubmit(item)
            setLink("")
          }}
        >
          Add Link
        </Button>
      </div>
      {!!error && (
        <p className="text-sm font-medium text-destructive mt-2">{error}</p>
      )}
    </div>
  )
}
