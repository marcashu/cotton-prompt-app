"use client"

import useSession from "@/hooks/useSession"
import { ArtistStatus } from "../../_lib/constants"
import YourOrdersAsArtistSubPage from "../_components/YourOrdersAsArtistSubPage"

export default function YourOrdersAsArtistForUploadPage() {
  const { session } = useSession()
  const artistStatus = `${ArtistStatus.Claimed},${ArtistStatus.ForReupload}`
  const url = `/api/orders?artistId=${session?.userId}&artistStatus=${artistStatus}`

  return <YourOrdersAsArtistSubPage title="For your Upload" url={url} />
}
