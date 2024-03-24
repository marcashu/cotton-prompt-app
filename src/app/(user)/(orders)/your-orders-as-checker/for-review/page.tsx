"use client"

import useSession from "@/hooks/useSession"
import CheckerStatus from "@/enums/checkerStatus"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForReviewPage() {
  const { session } = useSession()
  const url = `/api/orders?checkerId=${session?.userId}&checkerStatus=${CheckerStatus.ForReview}`

  return <YourOrdersPage title="For your Review" url={url} />
}
