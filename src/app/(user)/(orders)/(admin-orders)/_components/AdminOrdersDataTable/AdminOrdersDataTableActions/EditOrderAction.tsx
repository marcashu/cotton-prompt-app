import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function EditOrderAction({ id }: { id: number }) {
  return (
    <DropdownMenuItem className="cursor-pointer" asChild>
      <Link href={`/edit-order/${id}`}>Edit</Link>
    </DropdownMenuItem>
  )
}
