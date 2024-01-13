"use client"

import useSession from "@/hooks/useSession"
import { CheckerStatus } from "../../_lib/constants"
import YourOrdersAsArtistSubPage from "../_components/YourOrdersAsArtistSubPage"

export default function YourOrdersAsArtistForReviewPage() {
  const { session } = useSession()
  const url = `/api/orders?artistId=${session?.userId}&checkerStatus=${CheckerStatus.ForReview}`

  return (
    <YourOrdersAsArtistSubPage title="Waiting for Checker Review" url={url} />
  )
}
