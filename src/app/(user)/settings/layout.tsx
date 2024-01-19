import NavItem from "@/types/navItem"
import SideNavLayout from "@/app/_components/SideNavLayout"

const navItems: NavItem[] = [
  {
    name: "Design Brackets",
    href: "/settings/design-brackets",
  },
  {
    name: "Print Colors",
    href: "/settings/print-colors",
  },
  {
    name: "Output Sizes",
    href: "/settings/output-sizes",
  },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SideNavLayout title="Settings" navItems={navItems}>
      {children}
    </SideNavLayout>
  )
}
