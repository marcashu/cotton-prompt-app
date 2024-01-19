"use client"

import useSession from "@/hooks/useSession"
import { CheckerStatus } from "../../_lib/constants"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForReviewPage() {
  const { session } = useSession()
  const url = `/api/orders?artistId=${session?.userId}&checkerStatus=${CheckerStatus.ForReview}`

  return <YourOrdersPage title="Waiting for Checker Review" url={url} />
}
