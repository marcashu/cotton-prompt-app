import { Card, CardContent } from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"
import FullscreenableImage from "@/components/ui/fullscreenable-image"
import { TypographyMuted, TypographySmall } from "@/components/ui/typography"
import Link from "next/link"
import { useState } from "react"

export default function ImageReference({
  url,
  index,
}: {
  url: string
  index: number
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
        </CardContent>
      </Card>
    </CarouselItem>
  )
}
