"use client"

import SideNavLayout from "@/app/(user)/_components/SideNavLayout"
import { getNavItems } from "../_lib/constants"
import useSWR from "swr"
import CanDoModel from "@/types/canDoModel"

export default function YourOrdersAsArtistLayout({
  params,
  children,
}: {
  params: { userId: string }
  children: React.ReactNode
}) {
  const { data } = useSWR<CanDoModel>(
    `/api/artists/${params.userId}/can-claim-change-request`
  )

  return (
    <SideNavLayout
      title="Your Orders as Artist"
      navItems={getNavItems(params.userId, !!data?.canDo)}
    >
      {children}
    </SideNavLayout>
  )
}
