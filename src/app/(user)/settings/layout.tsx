"use client"

import NavItem from "@/types/navItem"
import SideNavLayout from "@/app/(user)/_components/SideNavLayout"
import useSession from "@/hooks/useSession"
import Role from "@/enums/role"

const getNavItems = (isSuperAdmin: boolean) => {
  const navItems: NavItem[] = [
    ...(isSuperAdmin
      ? [
          {
            name: "Design Brackets",
            href: "/settings/design-brackets",
          },
        ]
      : []),
    {
      name: "Print Colors",
      href: "/settings/print-colors",
    },
    {
      name: "Output Sizes",
      href: "/settings/output-sizes",
    },
    ...(isSuperAdmin
      ? [
          {
            name: "Rates",
            href: "/settings/rates",
          },
        ]
      : []),
    {
      name: "Email Templates",
      href: "/settings/email-templates",
    },
  ]

  return navItems
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = useSession()
  const isSuperAdmin = session?.selectedRole === Role.SuperAdmin
  const navItems = getNavItems(isSuperAdmin)

  return (
    <SideNavLayout title="Settings" navItems={navItems}>
      {children}
    </SideNavLayout>
  )
}
