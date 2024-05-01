import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import ArtistStatus from "@/enums/artistStatus"
import Link from "next/link"

export default function DownloadOrderAction({
  id,
  artistStatus,
  checkerStatus,
}: {
  id: number
  artistStatus?: string
  checkerStatus?: string
}) {
  return (
    <DropdownMenuItem
      disabled={
        (!artistStatus || artistStatus === ArtistStatus.Claimed) &&
        !checkerStatus
      }
      className="cursor-pointer"
      asChild
    >
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/Orders/${id}/download`}
        target="_blank"
        prefetch={false}
      >
        Download
      </Link>
    </DropdownMenuItem>
  )
}
