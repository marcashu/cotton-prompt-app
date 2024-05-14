import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function SendForPrintingOrderAction({
  id,
  onSendForPrinting,
}: {
  id: number
  onSendForPrinting: (id: number) => void
}) {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => onSendForPrinting(id)}
    >
      Send for Printing
    </DropdownMenuItem>
  )
}
