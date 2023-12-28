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
import OrderViewDesignCommentPreview from "../OrderViewDesignCommentPreview"

export default function OrderViewPreviousDesigns({
  designs,
}: {
  designs: DesignModel[]
}) {
  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>
        Previous Designs
        <TypographyMuted>View previous designs</TypographyMuted>
      </TypographyH3>
      <Accordion type="single" collapsible className="w-full">
        {designs.map((d, i) => (
          <AccordionItem value={d.name} key={d.id}>
            <AccordionTrigger>{`#${i + 1}`}</AccordionTrigger>
            <AccordionContent className="p-4 gap-2 flex flex-col">
              <div className="relative aspect-video w-full">
                <Image
                  src={d.url}
                  alt="design preview"
                  fill
                  className="object-contain"
                />
              </div>
              {d.comments.map((c, i) => (
                <OrderViewDesignCommentPreview key={i} comment={c} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}
