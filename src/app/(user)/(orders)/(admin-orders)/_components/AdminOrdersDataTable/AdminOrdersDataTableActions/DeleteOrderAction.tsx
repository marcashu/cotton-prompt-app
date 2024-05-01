import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function DeleteOrderAction({
  id,
  onDelete,
}: {
  id: number
  onDelete: (id: number) => void
}) {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(id)}>
      Delete
    </DropdownMenuItem>
  )
}
