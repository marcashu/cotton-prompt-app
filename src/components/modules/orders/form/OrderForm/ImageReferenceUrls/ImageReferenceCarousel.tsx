import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ImageReference from "../../../view/OrderViewImageReferences/ImageReference"
import ImageReferenceUpload from "@/types/imageReferenceUpload"
import { FieldArrayWithId } from "react-hook-form"

export default function ImageReferenceCarousel({
  imageReferences,
  onRemove,
}: {
  imageReferences: FieldArrayWithId<
    {
      imageReferences: ImageReferenceUpload[]
    },
    "imageReferences",
    "id"
  >[]
  onRemove: (index: number) => void
}) {
  return (
    <Carousel
      className="w-full self-center"
      opts={{
        startIndex: imageReferences.length - 1,
      }}
    >
      <CarouselContent>
        {imageReferences.map((ir, index) => (
          <ImageReference
            url={ir.value ?? ir.filePreviewUrl!}
            index={index}
            key={index}
            onRemove={() => {
              onRemove(index)
            }}
          />
        ))}
      </CarouselContent>
      <div className="flex gap-2 justify-center mt-2">
        <CarouselPrevious type="button" />
        <CarouselNext type="button" />
      </div>
    </Carousel>
  )
}
