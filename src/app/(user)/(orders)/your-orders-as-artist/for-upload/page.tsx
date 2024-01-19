"use client"

import useSession from "@/hooks/useSession"
import { ArtistStatus } from "../../_lib/constants"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsArtistForUploadPage() {
  const { session } = useSession()
  const artistStatus = `${ArtistStatus.Claimed},${ArtistStatus.ForReupload}`
  const url = `/api/orders?artistId=${session?.userId}&artistStatus=${artistStatus}`

  return <YourOrdersPage title="For your Upload" url={url} />
}
