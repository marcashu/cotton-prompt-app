import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function RedrawOrderAction({ id }: { id: number }) {
  return (
    <DropdownMenuItem className="cursor-pointer" asChild>
      <Link href={`/redraw-order/${id}`}>Redraw</Link>
    </DropdownMenuItem>
  )
}
