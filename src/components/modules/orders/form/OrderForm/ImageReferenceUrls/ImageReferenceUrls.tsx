import { ArrayPath, Control, FieldArray, useFieldArray } from "react-hook-form"
import { OrderFormValues } from "../orderFormSchema"
import { FormLabel } from "@/components/ui/form"
import { TypographyMuted } from "@/components/ui/typography"
import AddLinkInput from "./AddLinkInput"
import ImageReferenceCarousel from "./ImageReferenceCarousel"
import UploadImageButton from "./UploadImageButton"

export default function ImageReferenceUrls({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  const { fields, append, remove } = useFieldArray({
    name: "imageReferences",
    control: control,
  })

  const handleRemove = (index: number) => {
    remove(index)
  }

  const handleAdd = (
    value: FieldArray<OrderFormValues, ArrayPath<OrderFormValues>>
  ) => {
    append(value)
  }

  return (
    <div className={className}>
      <FormLabel>Image References</FormLabel>
      <div className="py-3">
        {fields.length > 0 ? (
          <ImageReferenceCarousel
            imageReferences={fields}
            onRemove={handleRemove}
          />
        ) : (
          <TypographyMuted>No image reference</TypographyMuted>
        )}
      </div>
      <div className="mt-2 flex gap-2 items-center">
        <UploadImageButton onSubmit={handleAdd} />
        <TypographyMuted>or</TypographyMuted>
        <AddLinkInput onSubmit={handleAdd} />
      </div>
    </div>
  )
}
