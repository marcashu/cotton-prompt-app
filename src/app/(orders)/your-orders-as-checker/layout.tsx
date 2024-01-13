import SideNavLayout from "@/app/_components/SideNavLayout"
import { navItems } from "./_lib/constants"

export default function YourOrdersAsCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SideNavLayout title="Your Orders as Checker" navItems={navItems}>
      {children}
    </SideNavLayout>
  )
}
