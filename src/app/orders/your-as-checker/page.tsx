import { TypographyH2 } from "@/components/ui/typography"
import YourOrderDataTables from "../_components/YourOrderDataTables"

export default function YourOrdersAsCheckerPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Your Orders as Checker</TypographyH2>
      <YourOrderDataTables role="checker" />
    </div>
  )
}
