import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { TypographyH3 } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
import { cn } from "@/lib/utils"
import NavItem from "@/types/navItem"
import Link from "next/link"
import { usePathname } from "next/navigation"

const adminNavItems: NavItem[] = [
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Settings",
    href: "/settings",
  },
]

const artistNavItems: NavItem[] = [
  {
    name: "Available Orders",
    href: "/orders/available",
  },
  {
    name: "Your Orders",
    href: "/orders/your",
  },
]

export default function HeaderMenu() {
  const pathname = usePathname()
  const { session } = useSession()

  if (!session) return <></>

  const navItems =
    session?.userRole === "admin" ? adminNavItems : artistNavItems

  return (
    <NavigationMenu className="container p-4">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-none",
                  item.href.includes(pathname) ? "border-b-2 border-black" : ""
                )}
              >
                <TypographyH3>{item.name}</TypographyH3>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
