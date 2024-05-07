"use client"

import { TypographyMuted } from "@/components/ui/typography"
import PageHeaderWithBack from "./(user)/_components/PageHeaderWithBack"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-10">
      <PageHeaderWithBack
        title="Something went wrong!"
        description="Kindly contact your admin and send the error
        log below"
      />
      <TypographyMuted>{`${error.name}: ${error.message}`}</TypographyMuted>
      <TypographyMuted>
        {error.stack ?? "Error message not found."}
      </TypographyMuted>
    </div>
  )
}
