import ArtistStatus from "@/enums/artistStatus"
import YourOrdersPage from "../../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForReviewPage({
  params,
}: {
  params: { userId: string }
}) {
  const url = `/api/orders?artistId=${params.userId}&artistStatus=${ArtistStatus.DesignSubmitted}`

  return <YourOrdersPage title="Waiting for Checker Review" url={url} />
}
