import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyMuted } from "@/components/ui/typography"
import DesignModel from "@/types/designModel"
import Image from "next/image"

export default function OrderViewPreviousDesigns({
  designs,
}: {
  designs: DesignModel[]
}) {
  const prevDesigns = designs.slice(0, -1)
  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>
        Previous Designs
        <TypographyMuted>View previous designs</TypographyMuted>
      </TypographyH3>
      <Accordion type="single" collapsible className="w-full">
        {prevDesigns.map((d) => (
          <AccordionItem value={d.name} key={d.lineId}>
            <AccordionTrigger>{`#${d.lineId}`}</AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="relative aspect-video w-full">
                <Image
                  src={d.url}
                  alt="design preview"
                  fill
                  className="object-contain"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}
