"use client"

import { Button } from "@/components/ui/button"
import SideNavLayout from "../../_components/SideNavLayout"
import ordersSideNavItems from "./_lib/ordersSideNavItems"
import Link from "next/link"
import { TypographyH2 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
import Role from "@/enums/role"

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = useSession()

  const title = (
    <div className="flex justify-between border-b pb-2">
      <TypographyH2>Orders</TypographyH2>
      <Button asChild>
        <Link href="/create-order">Create Order</Link>
      </Button>
    </div>
  )

  return session?.selectedRole === Role.Admin ? (
    <SideNavLayout title={title} navItems={ordersSideNavItems}>
      {children}
    </SideNavLayout>
  ) : (
    children
  )
}
