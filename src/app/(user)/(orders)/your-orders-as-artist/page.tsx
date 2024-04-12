import { redirect } from "next/navigation"
import { getNavItems } from "./_lib/constants"

export default function YourOrdersAsArtistPage() {
  const navItems = getNavItems(false)
  redirect(navItems[0].href)
}
