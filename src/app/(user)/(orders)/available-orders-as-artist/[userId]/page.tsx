import { TypographyH2 } from "@/components/ui/typography"
import CanDoModel from "@/types/canDoModel"
import AvailableOrderAsArtistDataTables from "./_components/AvailableOrderAsArtistDataTables"

async function getCanClaim(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/artists/${userId}/can-claim`,
    {
      next: {
        tags: [`canClaim:${userId}`],
      },
    }
  )
  const result = (await res.json()) as CanDoModel
  return result
}

export default async function AvailableOrdersAsArtistPage({
  params,
}: {
  params: { userId: string }
}) {
  const canClaim = await getCanClaim(params.userId)

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Available Orders as Artist</TypographyH2>
      <AvailableOrderAsArtistDataTables
        userId={params.userId}
        canClaim={canClaim}
      />
    </div>
  )
}
