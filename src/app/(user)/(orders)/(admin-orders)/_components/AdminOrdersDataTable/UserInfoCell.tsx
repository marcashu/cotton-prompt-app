import { TypographyMuted, TypographySmall } from "@/components/ui/typography"

export default function UserInfoCell({
  name,
  status,
  isRemoved,
  isApproved,
  crArtistName,
}: {
  name?: string
  status?: string
  isRemoved?: boolean
  isApproved?: boolean
  crArtistName?: string
}) {
  // Show "Approved by admin" in green if checker was removed but order is approved
  if (isRemoved && isApproved) {
    return (
      <div className="flex flex-col gap-1 items-center">
        <TypographySmall className="text-center text-green-600 font-bold text-xs">
          Approved by admin
        </TypographySmall>
      </div>
    )
  }

  // Show "Checker removed" in bright red if the checker was removed and not yet approved
  if (isRemoved) {
    return (
      <div className="flex flex-col gap-1 items-center">
        <TypographySmall className="text-center text-red-600 font-bold text-xs">
          Checker removed
        </TypographySmall>
        <TypographyMuted className="text-[10px] text-red-500">
          Needs admin attention
        </TypographyMuted>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      {!name && !status ? (
        <>-</>
      ) : (
        <>
          <TypographySmall className="text-center text-xs">
            {name ?? "-"}
          </TypographySmall>
          <TypographyMuted className="text-[10px]">{status ?? "-"}</TypographyMuted>
        </>
      )}
      {crArtistName && (
        <div className="pt-1 border-t border-gray-200">
          <TypographyMuted className="text-[10px] text-blue-600">
            CR: {crArtistName}
          </TypographyMuted>
        </div>
      )}
    </div>
  )
}
