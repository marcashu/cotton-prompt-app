import Role, { isAdmin } from "@/enums/role"
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
    href: "/ongoing-orders",
  },
  {
    name: "Users",
    href: "/users",
  },
  {
    name: "Settings",
    href: "/settings",
  },
  {
    name: "Invoices",
    href: "/invoices",
  },
]

const artistNavItems = (userId: string): NavItem[] => [
  {
    name: "Available Orders as Artist",
    href: `/available-orders-as-artist/${userId}`,
  },
  {
    name: "Your Orders as Artist",
    href: `/your-orders-as-artist/${userId}`,
  },
  {
    name: "Invoices",
    href: "/invoices",
  },
  {
    name: "Payments",
    href: "/payments",
  },
]

const checkerNavItems = (userId: string): NavItem[] => [
  {
    name: "Available Orders as Checker",
    href: "/available-orders-as-checker",
  },
  {
    name: "Your Orders as Checker",
    href: `/your-orders-as-checker/${userId}`,
  },
  {
    name: "Invoices",
    href: "/invoices",
  },
  {
    name: "Payments",
    href: "/payments",
  },
]

export default function HeaderMenu() {
  const pathname = usePathname()
  const { session } = useSession()

  if (!session) return <></>

  const navItems = isAdmin(session.selectedRole)
    ? adminNavItems
    : session.selectedRole === Role.Checker
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
                  "rounded-none max-w-[260px] text-center h-auto",
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
