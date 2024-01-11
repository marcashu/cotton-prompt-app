import { TypographyH2 } from "@/components/ui/typography"
import YourOrderDataTables from "../_components/YourOrderDataTables"

export default function YourOrdersAsArtistPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Your Orders as Artist</TypographyH2>
      <YourOrderDataTables role="artist" />
    </div>
  )
}
