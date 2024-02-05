"use client"

import useSession from "@/hooks/useSession"
import {
  ArtistStatus,
  CheckerStatus,
  CustomerStatus,
} from "../../_lib/constants"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsCheckerForCustomerReviewPage() {
  const { session } = useSession()
  const url = `/api/orders?checkerId=${session?.userId}&artistStatus=${ArtistStatus.DesignSubmitted}&checkerStatus=${CheckerStatus.Approved}&customerStatus=${CustomerStatus.ForReview}`

  return <YourOrdersPage title="Waiting for Customer Review (CR)" url={url} />
}
