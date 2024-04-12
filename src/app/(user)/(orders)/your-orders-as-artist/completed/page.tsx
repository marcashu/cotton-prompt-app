"use client"

import useSession from "@/hooks/useSession"
import ArtistStatus from "@/enums/artistStatus"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsArtistCompletedPage() {
  const { session } = useSession()
  const url = `/api/orders?artistId=${session?.userId}&artistStatus=${ArtistStatus.Completed}`

  return <YourOrdersPage title="Completed" url={url} />
}
