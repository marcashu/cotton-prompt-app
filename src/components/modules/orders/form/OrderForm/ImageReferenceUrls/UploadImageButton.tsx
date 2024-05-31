import { Button } from "@/components/ui/button"
import ImageReferenceUpload from "@/types/imageReferenceUpload"
import { ChangeEvent, createRef } from "react"

export default function UploadImageButton({
  onSubmit,
}: {
  onSubmit: (value: ImageReferenceUpload) => void
}) {
  const ref = createRef<HTMLInputElement>()
  const handleUploadClick = () => ref.current?.click()

  const handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return

    const file = event.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      const filePreviewUrl = URL.createObjectURL(file)
      onSubmit({
        value: reader.result as string,
        type: "File",
        name: file.name,
        filePreviewUrl: filePreviewUrl,
      })

      if (ref.current) {
        ref.current.value = ""
      }
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={handleUploadClick}>
        Upload Image
      </Button>
      <input
        ref={ref}
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        onChange={handleUploadChange}
      />
    </>
  )
}
