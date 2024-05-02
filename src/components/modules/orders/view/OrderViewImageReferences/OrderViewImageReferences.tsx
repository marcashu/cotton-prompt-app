"use client"

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TypographyH3, TypographyMuted } from "@/components/ui/typography"
import ImageReference from "./ImageReference"

export default function OrderViewImageReferences({ urls }: { urls: string[] }) {
  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>Image References</TypographyH3>
      {urls.length > 0 ? (
        <Carousel className="w-full max-w-lg self-center">
          <CarouselContent>
            {urls.map((url, i) => (
              <ImageReference url={url} index={i} key={i} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <TypographyMuted>No image reference</TypographyMuted>
      )}
    </Card>
  )
}
