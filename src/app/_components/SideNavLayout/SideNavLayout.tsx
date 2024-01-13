import { TypographyH2 } from "@/components/ui/typography"
import NavItem from "@/types/navItem"
import SideNav from "./SideNav"

export default function SideNavLayout({
  title,
  navItems,
  children,
}: {
  title: string
  navItems: NavItem[]
  children: React.ReactNode
}) {
  return (
    <div>
      <TypographyH2>{title}</TypographyH2>
      <div className="flex mt-8">
        <aside>
          <SideNav navItems={navItems} />
        </aside>
        <div className="flex-1 px-8">{children}</div>
      </div>
    </div>
  )
}
