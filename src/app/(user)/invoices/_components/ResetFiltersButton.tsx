import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function ResetFiltersButton({
  onReset,
}: {
  onReset: () => void
}) {
  return (
    <Button variant="ghost" onClick={onReset} className="h-8 px-2 lg:px-3">
      Reset
      <X className="ml-2 h-4 w-4 mt-[3px]" />
    </Button>
  )
}
