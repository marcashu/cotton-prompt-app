import CheckerStatus from "@/enums/checkerStatus"
import YourOrdersPage from "../../../_components/YourOrdersPage"

export default function YourOrdersAsCheckerForReuploadPage({
  params,
}: {
  params: { userId: string }
}) {
  const url = `/api/orders?checkerId=${params.userId}&checkerStatus=${CheckerStatus.ReuploadRequested},${CheckerStatus.Claimed}`

  return <YourOrdersPage title="Waiting for Artist Reupload" url={url} />
}
