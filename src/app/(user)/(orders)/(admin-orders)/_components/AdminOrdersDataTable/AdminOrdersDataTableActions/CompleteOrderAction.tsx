import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function CompleteOrderAction({
  id,
  onComplete,
}: {
  id: number
  onComplete: (id: number) => void
}) {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => onComplete(id)}>
      Complete
    </DropdownMenuItem>
  )
}
