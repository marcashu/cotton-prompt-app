"use client"

import useSession from "@/hooks/useSession"
import { CheckerStatus } from "../../_lib/constants"
import YourOrdersAsArtistSubPage from "../_components/YourOrdersAsArtistSubPage"

export default function YourOrdersAsArtistCompletedPage() {
  const { session } = useSession()
  const url = `/api/orders?artistId=${session?.userId}&checkerStatus=${CheckerStatus.Approved}`

  return <YourOrdersAsArtistSubPage title="Completed" url={url} />
}
