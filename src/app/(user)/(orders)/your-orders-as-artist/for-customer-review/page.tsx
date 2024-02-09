"use client"

import useSession from "@/hooks/useSession"
import CustomerStatus from "@/enums/customerStatus"
import CheckerStatus from "@/enums/checkerStatus"
import ArtistStatus from "@/enums/artistStatus"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForCustomerReviewPage() {
  const { session } = useSession()
  const url = `/api/orders?artistId=${session?.userId}&artistStatus=${ArtistStatus.DesignSubmitted}&checkerStatus=${CheckerStatus.Approved}&customerStatus=${CustomerStatus.ForReview}`

  return <YourOrdersPage title="Waiting for Customer Review (CR)" url={url} />
}
