"use client"

import useSession from "@/hooks/useSession"
import { ArtistStatus } from "../../_lib/constants"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForReviewPage() {
  const { session } = useSession()
  const url = `/api/orders?artistId=${session?.userId}&artistStatus=${ArtistStatus.DesignSubmitted}`

  return <YourOrdersPage title="Waiting for Checker Review" url={url} />
}
