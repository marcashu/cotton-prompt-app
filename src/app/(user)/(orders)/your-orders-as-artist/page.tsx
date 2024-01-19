import { redirect } from "next/navigation"
import { navItems } from "./_lib/constants"

export default function YourOrdersAsArtistPage() {
  redirect(navItems[0].href)
}
