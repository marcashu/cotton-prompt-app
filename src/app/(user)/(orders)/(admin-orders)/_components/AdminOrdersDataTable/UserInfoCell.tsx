import { TypographyMuted, TypographySmall } from "@/components/ui/typography"

export default function UserInfoCell({
  name,
  status,
}: {
  name?: string
  status?: string
}) {
  if (!name) return <>-</>

  return (
    <div className="flex flex-col gap-2 items-center">
      <TypographySmall className="text-center">{name}</TypographySmall>
      <TypographyMuted className="text-xs">{status}</TypographyMuted>
    </div>
  )
}
