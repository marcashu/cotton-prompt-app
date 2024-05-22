import CheckerStatus from "@/enums/checkerStatus"
import YourOrdersPage from "../../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForReviewPage({
  params,
}: {
  params: { userId: string }
}) {
  const url = `/api/orders?checkerId=${params.userId}&checkerStatus=${CheckerStatus.ForReview}`

  return <YourOrdersPage title="For your Review" url={url} />
}
