import { TypographyH3 } from "@/components/ui/typography"
import { getRates } from "./_lib/ratesService"
import RatesForm from "./_components/RatesForm"

export default async function RatesPage() {
  const rates = await getRates()

  return (
    <div className="px-8 max-w-3xl flex flex-col gap-4">
      <TypographyH3 withSeparator>Rates</TypographyH3>
      <RatesForm rates={rates} />
    </div>
  )
}
