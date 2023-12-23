"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { TypographyH3 } from "@/components/ui/typography"
import Image from "next/image"

export default function OrderViewImageReferences({ urls }: { urls: string[] }) {
  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>Image References</TypographyH3>
      <Carousel className="w-full max-w-lg self-center">
        <CarouselContent>
          {urls.map((url, i) => (
            <CarouselItem key={i}>
              <Card className="shadow p-2">
                <CardContent className="flex aspect-video items-center justify-center relative">
                  <Image
                    src={url}
                    alt={`image ref ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  )
}
