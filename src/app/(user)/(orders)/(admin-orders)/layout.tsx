"use client"

import { Button } from "@/components/ui/button"
import SideNavLayout from "../../_components/SideNavLayout"
import ordersSideNavItems from "./_lib/ordersSideNavItems"
import Link from "next/link"
import { TypographyH2 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
import { isAdmin } from "@/enums/role"
import GlobalOrderSearch from "./_components/GlobalOrderSearch"

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = useSession()

  const title = (
    <div className="flex flex-col gap-3 border-b pb-2">
      <div className="flex justify-between items-center">
        <TypographyH2>Orders</TypographyH2>
        <Button asChild>
          <Link href="/create-order">Create Order</Link>
        </Button>
      </div>
      <GlobalOrderSearch />
    </div>
  )

  return isAdmin(session?.selectedRole) ? (
    <SideNavLayout title={title} navItems={ordersSideNavItems}>
      {children}
    </SideNavLayout>
  ) : (
    children
  )
}
