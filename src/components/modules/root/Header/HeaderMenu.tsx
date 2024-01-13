import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { TypographyLarge } from "@/components/ui/typography"
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

const artistNavItems = (userId: string): NavItem[] => [
  {
    name: "Available Orders as Artist",
    href: `/orders/available-as-artist/${userId}`,
  },
  {
    name: "Your Orders as Artist",
    href: "/orders/your-as-artist",
  },
]

const checkerNavItems = (userId: string): NavItem[] => [
  {
    name: "Available Orders as Artist",
    href: `/orders/available-as-artist/${userId}`,
  },
  {
    name: "Available Orders as Checker",
    href: "/orders/available-as-checker",
  },
  {
    name: "Your Orders as Artist",
    href: "/orders/your-as-artist",
  },
  {
    name: "Your Orders as Checker",
    href: "/orders/your-as-checker",
  },
]

export default function HeaderMenu() {
  const pathname = usePathname()
  const { session } = useSession()

  if (!session) return <></>

  const navItems =
    session?.userRole === "admin"
      ? adminNavItems
      : session.userRole === "checker"
      ? checkerNavItems(session.userId)
      : artistNavItems(session.userId)

  return (
    <NavigationMenu className="container p-4">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-none max-w-[200px] text-center h-auto",
                  pathname.startsWith(item.href)
                    ? "border-b-2 border-black"
                    : ""
                )}
              >
                <TypographyLarge>{item.name}</TypographyLarge>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
