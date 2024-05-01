import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function ViewOrderAction({ id }: { id: number }) {
  return (
    <DropdownMenuItem className="cursor-pointer" asChild>
      <Link href={`/view-order/${id}`}>View</Link>
    </DropdownMenuItem>
  )
}
