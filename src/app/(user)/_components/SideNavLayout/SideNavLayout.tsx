import { TypographyH2 } from "@/components/ui/typography"
import NavItem from "@/types/navItem"
import SideNav from "./SideNav"

export default function SideNavLayout({
  title,
  navItems,
  children,
}: {
  title: string | React.ReactNode
  navItems: NavItem[]
  children: React.ReactNode
}) {
  return (
    <div>
      {typeof title === "string" ? (
        <TypographyH2 withSeparator>{title}</TypographyH2>
      ) : (
        title
      )}
      <div className="flex mt-8">
        <aside>
          <SideNav navItems={navItems} />
        </aside>
        <div className="flex-1 px-8">{children}</div>
      </div>
    </div>
  )
}
