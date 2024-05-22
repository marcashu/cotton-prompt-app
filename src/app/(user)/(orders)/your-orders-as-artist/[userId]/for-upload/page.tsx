import ArtistStatus from "@/enums/artistStatus"
import YourOrdersPage from "../../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForUploadPage({
  params,
}: {
  params: { userId: string }
}) {
  const artistStatus = `${ArtistStatus.Claimed},${ArtistStatus.ForReupload}`
  const url = `/api/orders?artistId=${params.userId}&artistStatus=${artistStatus}`

  return <YourOrdersPage title="For your Upload" url={url} />
}
