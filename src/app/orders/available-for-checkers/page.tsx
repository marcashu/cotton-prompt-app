import { TypographyH2 } from "@/components/ui/typography"
import AvailableOrderDataTables from "../_components/AvailableOrderDataTables"

export default function AvailableOrdersForCheckersPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Available Orders for Checkers</TypographyH2>
      <AvailableOrderDataTables
        canClaim={{ canClaim: true, message: "" }}
        role="checker"
      />
    </div>
  )
}
