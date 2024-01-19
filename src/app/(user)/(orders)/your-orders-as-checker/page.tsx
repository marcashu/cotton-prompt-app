import { redirect } from "next/navigation"
import { navItems } from "./_lib/constants"

export default function YourOrdersAsCheckerPage() {
  redirect(navItems[0].href)
}
