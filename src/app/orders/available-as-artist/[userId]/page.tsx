import { TypographyH2 } from "@/components/ui/typography"
import CanArtistClaimModel from "@/types/canArtistClaimModel"
import AvailableOrderDataTables from "../../_components/AvailableOrderDataTables"

async function getCanClaim(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/artists/${userId}/can-claim`,
    {
      next: {
        tags: [`canClaim:${userId}`],
      },
    }
  )
  const result = (await res.json()) as CanArtistClaimModel
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
      <AvailableOrderDataTables canClaim={canClaim} role="artist" />
    </div>
  )
}
