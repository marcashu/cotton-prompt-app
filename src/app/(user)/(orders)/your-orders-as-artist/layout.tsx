import SideNavLayout from "@/app/(user)/_components/SideNavLayout"
import { navItems } from "./_lib/constants"

export default function YourOrdersAsArtistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SideNavLayout title="Your Orders as Artist" navItems={navItems}>
      {children}
    </SideNavLayout>
  )
}
