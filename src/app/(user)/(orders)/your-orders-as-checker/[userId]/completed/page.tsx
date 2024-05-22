import CheckerStatus from "@/enums/checkerStatus"
import ArtistStatus from "@/enums/artistStatus"
import YourOrdersPage from "../../../_components/YourOrdersPage"

export default function YourOrdersAsCheckerCompletedPage({
  params,
}: {
  params: { userId: string }
}) {
  const url = `/api/orders?checkerId=${params.userId}&checkerStatus=${CheckerStatus.Approved}&artistStatus=${ArtistStatus.Completed}`

  return <YourOrdersPage title="Completed" url={url} />
}
