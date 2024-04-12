"use client"

import SideNavLayout from "@/app/(user)/_components/SideNavLayout"
import { getNavItems } from "./_lib/constants"
import useSWR from "swr"
import CanDoModel from "@/types/canDoModel"
import useSession from "@/hooks/useSession"

export default function YourOrdersAsArtistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = useSession()
  const { data } = useSWR<CanDoModel>(
    `/api/artists/${session?.userId}/can-claim-change-request`
  )

  return (
    <SideNavLayout
      title="Your Orders as Artist"
      navItems={getNavItems(!!data?.canDo)}
    >
      {children}
    </SideNavLayout>
  )
}
