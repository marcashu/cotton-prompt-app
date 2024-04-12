import NavItem from "@/types/navItem"
import SideNavLayout from "@/app/(user)/_components/SideNavLayout"

const navItems: NavItem[] = [
  {
    name: "Users",
    href: "/users",
  },
  {
    name: "User Groups",
    href: "/user-groups",
  },
]

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SideNavLayout title="Users" navItems={navItems}>
      {children}
    </SideNavLayout>
  )
}
