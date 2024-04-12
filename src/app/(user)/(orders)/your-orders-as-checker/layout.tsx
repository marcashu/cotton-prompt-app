"use client"

import SideNavLayout from "@/app/(user)/_components/SideNavLayout"
import { getNavItems } from "./_lib/constants"
import useSession from "@/hooks/useSession"
import useSWR from "swr"
import CanDoModel from "@/types/canDoModel"

export default function YourOrdersAsCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = useSession()
  const { data } = useSWR<CanDoModel>(
    `/api/users/checker/${session?.userId}/has-waiting-for-customer`
  )

  return (
    <SideNavLayout
      title="Your Orders as Checker"
      navItems={getNavItems(!!data?.canDo)}
    >
      {children}
    </SideNavLayout>
  )
}
