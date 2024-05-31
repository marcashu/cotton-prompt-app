import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"
import FullscreenableImage from "@/components/ui/fullscreenable-image"
import { TypographyMuted, TypographySmall } from "@/components/ui/typography"
import { X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ImageReference({
  url,
  index,
  onRemove,
}: {
  url: string
  index: number
  onRemove?: (index: number) => void
}) {
  const [error, setError] = useState(false)

  const handleError = () => setError(true)

  return (
    <CarouselItem>
      <Card className="shadow p-2">
        <CardContent className="flex aspect-video items-center justify-center relative">
          {!error ? (
            <FullscreenableImage
              src={url}
              alt={`image ref ${index + 1}`}
              onError={handleError}
            />
          ) : (
            <TypographyMuted>
              {"The image failed to load. Try accessing it directly "}
              <TypographySmall className="text-black">
                <Link href={url} target="_blank">
                  here
                </Link>
              </TypographySmall>
            </TypographyMuted>
          )}
          {!!onRemove && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-1 right-1 rounded-full shadow"
              onClick={() => onRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </CarouselItem>
  )
}
