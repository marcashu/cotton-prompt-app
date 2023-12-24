"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyMuted } from "@/components/ui/typography"
import { Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, DragEvent, createRef, useState } from "react"

export default function OrderViewDesignUpload() {
  const ref = createRef<HTMLInputElement>()
  const [previewImage, setPreviewImage] = useState<string>()

  const handleClick = () => ref.current?.click()

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return

    const file = event.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>
        Designs
        <TypographyMuted>Upload your design</TypographyMuted>
      </TypographyH3>
      <div className="flex flex-col gap-4 self-center max-w-lg w-full">
        <div
          className="flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 relative aspect-video w-full"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={ref}
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleChange}
          />
          {!previewImage ? (
            <div className="text-center px-6 py-10">
              <ImageIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <p className="pl-1">Upload a file or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          ) : (
            <Image
              src={previewImage}
              alt="design preview"
              fill
              className="object-contain"
            />
          )}
        </div>
        {!!previewImage && (
          <div className="self-end">
            <Button type="button" variant="outline" onClick={handleClick}>
              Re-upload
            </Button>
            <Button type="button">Submit</Button>
          </div>
        )}
      </div>
    </Card>
  )
}
