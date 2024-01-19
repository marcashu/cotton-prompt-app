"use client"

import useSession from "@/hooks/useSession"
import { CheckerStatus } from "../../_lib/constants"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsArtistCompletedPage() {
  const { session } = useSession()
  const url = `/api/orders?artistId=${session?.userId}&checkerStatus=${CheckerStatus.Approved}`

  return <YourOrdersPage title="Completed" url={url} />
}
