import { TypographyH2 } from "@/components/ui/typography"
import AvailableOrderAsArtistDataTables from "./_components/AvailableOrderAsArtistDataTables"

export default async function AvailableOrdersAsArtistPage({
  params,
}: {
  params: { userId: string }
}) {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Available Orders as Artist</TypographyH2>
      <AvailableOrderAsArtistDataTables userId={params.userId} />
    </div>
  )
}
