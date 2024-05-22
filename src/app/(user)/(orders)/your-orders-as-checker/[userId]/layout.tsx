"use client"

import SideNavLayout from "@/app/(user)/_components/SideNavLayout"
import { getNavItems } from "../_lib/constants"
import useSWR from "swr"
import CanDoModel from "@/types/canDoModel"

export default function YourOrdersAsCheckerLayout({
  params,
  children,
}: {
  params: { userId: string }
  children: React.ReactNode
}) {
  const { data } = useSWR<CanDoModel>(
    `/api/users/checker/${params.userId}/has-waiting-for-customer`
  )

  return (
    <SideNavLayout
      title="Your Orders as Checker"
      navItems={getNavItems(params.userId, !!data?.canDo)}
    >
      {children}
    </SideNavLayout>
  )
}
