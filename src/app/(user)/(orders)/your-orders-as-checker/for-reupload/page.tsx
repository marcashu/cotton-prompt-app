"use client"

import useSession from "@/hooks/useSession"
import CheckerStatus from "@/enums/checkerStatus"
import YourOrdersPage from "../../_components/YourOrdersPage"

export default function YourOrdersAsCheckerForReuploadPage() {
  const { session } = useSession()
  const url = `/api/orders?checkerId=${session?.userId}&checkerStatus=${CheckerStatus.ReuploadRequested},${CheckerStatus.Claimed}`

  return <YourOrdersPage title="Waiting for Artist Reupload" url={url} />
}
