import ArtistStatus from "@/enums/artistStatus"
import YourOrdersPage from "../../../_components/YourOrdersPage"

export default function YourOrdersAsArtistCompletedPage({
  params,
}: {
  params: { userId: string }
}) {
  const url = `/api/orders?artistId=${params.userId}&artistStatus=${ArtistStatus.Completed}`

  return <YourOrdersPage title="Completed" url={url} />
}
