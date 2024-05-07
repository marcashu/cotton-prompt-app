"use client"

import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyMuted } from "@/components/ui/typography"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PageHeaderWithBack({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  const router = useRouter()

  const handleBack = () => router.back()

  return (
    <TypographyH2 withSeparator className="mb-4 col-span-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="link" size="icon" onClick={handleBack}>
            <ChevronLeft className="h-5 w-5" strokeWidth={4} />
          </Button>
          <div>
            {title}
            {!!description && <TypographyMuted>{description}</TypographyMuted>}
          </div>
        </div>
        {action}
      </div>
    </TypographyH2>
  )
}
