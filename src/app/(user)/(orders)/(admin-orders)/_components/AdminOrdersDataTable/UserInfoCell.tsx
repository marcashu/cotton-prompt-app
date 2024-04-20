import { TypographyMuted, TypographySmall } from "@/components/ui/typography"

export default function UserInfoCell({
  name,
  status,
}: {
  name?: string
  status?: string
}) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {!name && !status ? (
        <>-</>
      ) : (
        <>
          <TypographySmall className="text-center">
            {name ?? "-"}
          </TypographySmall>
          <TypographyMuted className="text-xs">{status ?? "-"}</TypographyMuted>
        </>
      )}
    </div>
  )
}
