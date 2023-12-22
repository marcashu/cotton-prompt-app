import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { TypographyH3 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavItem = {
  name: string
  href: string[]
}

const navItems: NavItem[] = [
  {
    name: "Orders",
    href: ["/orders", "/orders/create"],
  },
]

export default function HeaderMenu() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="container p-4">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href[0]} legacyBehavior passHref>
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
