import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ViewOrderButton({
  id,
  variant,
}: {
  id: number
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
}) {
  return (
    <Button variant={variant} asChild>
      <Link href={`/view-order/${id}`}>View</Link>
    </Button>
  )
}
