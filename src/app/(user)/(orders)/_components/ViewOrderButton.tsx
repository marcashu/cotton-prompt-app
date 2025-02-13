import { Button } from "@/components/ui/button"
import { TypographyP } from "@/components/ui/typography"
import Link from "next/link"

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h ${remainingMinutes}m`
}

export default function ViewOrderButton({
  id,
  variant,
  isTimer = false,
  minutes = 0,
}: {
  id: number
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  isTimer?: boolean
  minutes?: number
}) {
  return (
    <div className="flex gap-3 items-center shrink-0">
      {isTimer && (
        <TypographyP>Remaining time: {formatTime(minutes)} </TypographyP>
      )}
      <Button variant={variant} asChild>
        <Link href={`/view-order/${id}`}>View</Link>
      </Button>
    </div>
  )
}
