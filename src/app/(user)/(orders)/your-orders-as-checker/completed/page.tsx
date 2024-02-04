"use client"

import useSession from "@/hooks/useSession"
import { ArtistStatus, CheckerStatus } from "../../_lib/constants"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsCheckerCompletedPage() {
  const { session } = useSession()
  const url = `/api/orders?checkerId=${session?.userId}&checkerStatus=${CheckerStatus.Approved}&artistStatus=${ArtistStatus.Completed}`

  return <YourOrdersPage title="Completed" url={url} />
}
