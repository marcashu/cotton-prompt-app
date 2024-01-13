import { TypographyH2 } from "@/components/ui/typography"
import AvailableOrderAsCheckerDataTables from "./_components/AvailableOrderAsCheckerDataTables"

export default function AvailableOrdersAsCheckerPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Available Orders as Checker</TypographyH2>
      <AvailableOrderAsCheckerDataTables />
    </div>
  )
}
