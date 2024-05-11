import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function ResolveOrderAction({
  id,
  onResolve,
}: {
  id: number
  onResolve: (id: number) => void
}) {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => onResolve(id)}>
      Resolve
    </DropdownMenuItem>
  )
}
