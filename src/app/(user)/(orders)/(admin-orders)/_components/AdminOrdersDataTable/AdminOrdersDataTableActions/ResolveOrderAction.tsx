import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function ResolveOrderAction({
  id,
  isRedraw,
  onResolve,
}: {
  id: number
  isRedraw: boolean
  onResolve: (id: number) => void
}) {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => onResolve(id)}>
      {isRedraw ? "Reject" : "Resolve"}
    </DropdownMenuItem>
  )
}
