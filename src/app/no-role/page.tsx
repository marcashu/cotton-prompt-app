"use client"

import { TypographyH3, TypographyLarge } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"

export default function NoRolePage() {
  const { session } = useSession()
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100dvh" }}
    >
      <div className="flex flex-col">
        <TypographyH3>{`Welcome ${session?.name}!`}</TypographyH3>
        <TypographyLarge className="font-normal">
          You do not have a role currently. Please ask your admin for
          assistance.
        </TypographyLarge>
      </div>
    </div>
  )
}
