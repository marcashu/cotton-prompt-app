import { useToast } from "@/components/ui/use-toast"
import { Image as ImageIcon } from "lucide-react"
import { ChangeEvent, DragEvent, createRef, useState } from "react"
import { submitOrderDesign } from "../../orderActions"
import GetOrderModel from "@/types/getOrderModel"
import FullscreenableImage from "@/components/ui/fullscreenable-image"
import { Button } from "@/components/ui/button"
import { bytesToMegaBytes } from "@/helpers/fileHelper"
import useSession from "@/hooks/useSession"

export default function OrderViewDesignUpload({
  order,
}: {
  order: GetOrderModel
}) {
  const ref = createRef<HTMLInputElement>()
  const [previewImage, setPreviewImage] = useState<string>(
    order.design?.url ?? ""
  )
  const [file, setFile] = useState<{
    fileName: string
    fileBase64: string
  }>()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { session } = useSession()

  if (!session) return <></>

  const maxImageSize = Number(
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE_IN_MB ?? 10
  )

  const handleClick = () => ref.current?.click()

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    processFile(file)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return

    const file = event.target.files[0]
    processFile(file)
  }

  const handleSubmit = () => {
    if (!file) return

    setLoading(true)

    submitOrderDesign(order.id, file.fileBase64, file.fileName, session.userId)
      .then(() => {
        setFile(undefined)
        toast({
          title: "Design has been uploaded successfully",
          description: new Date().toLocaleString(),
        })
      })
      .catch(({ message }: { message: string }) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const processFile = (file: File) => {
    if (!file) return

    if (bytesToMegaBytes(file.size) > maxImageSize) {
      setFile(undefined)
      setPreviewImage(order.design?.url ?? "")
      toast({
        variant: "warning",
        title: "Please upload a smaller image",
        description: `The selected image has exceeded the max size limit of ${maxImageSize}MB.`,
      })
      return
    }

    setPreviewImage(URL.createObjectURL(file))
    getBase64(file)
  }

  const getBase64 = (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setFile({
        fileName: file.name,
        fileBase64: reader.result as string,
      })
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div className="flex flex-col gap-4 self-center max-w-lg w-full">
      <div className="rounded-lg border border-dashed border-gray-900/25 relative aspect-video w-full">
        <input
          ref={ref}
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={handleChange}
        />
        {!previewImage ? (
          <div
            className="w-full h-full flex justify-center items-center "
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-center px-6 py-10">
              <ImageIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <p className="pl-1">Upload a file or drag and drop</p>
              </div>
              {/* <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p> */}
              <p className="text-xs leading-5 text-gray-600">
                Up to {maxImageSize}MB
              </p>
            </div>
          </div>
        ) : (
          <FullscreenableImage src={previewImage} alt="design preview" />
        )}
      </div>
      {!!previewImage && (
        <div className="self-end">
          <Button type="button" variant="outline" onClick={handleClick}>
            Reupload
          </Button>
          {!!file && (
            <Button
              type="button"
              className="ml-4"
              onClick={handleSubmit}
              loading={loading}
            >
              Submit
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
