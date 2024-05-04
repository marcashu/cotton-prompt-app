import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function ViewOrderAction({
  id,
  label,
}: {
  id: number
  label?: string
}) {
  return (
    <DropdownMenuItem className="cursor-pointer" asChild>
      <Link href={`/view-order/${id}`}>{label ?? "View"}</Link>
    </DropdownMenuItem>
  )
}
