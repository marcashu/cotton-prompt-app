import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function ToggleOrderRedrawMarkAction({
  id,
  isRedraw,
  onToggleRedrawMark,
}: {
  id: number
  isRedraw: boolean
  onToggleRedrawMark: (id: number) => void
}) {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => onToggleRedrawMark(id)}
    >
      {`Mark as ${isRedraw ? "Non-redraw" : "Redraw"}`}
    </DropdownMenuItem>
  )
}
