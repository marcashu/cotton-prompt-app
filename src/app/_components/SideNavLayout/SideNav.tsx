"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import NavItem from "@/types/navItem"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideNav({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav className={"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
