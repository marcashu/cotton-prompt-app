import NavItem from "@/types/navItem";

export const getNavItems = (isChangeRequestArtist: boolean) => {
  const navItems: NavItem[] = [
    {
      name: "For your Upload",
      href: "/your-orders-as-artist/for-upload",
    },
    {
      name: "Waiting for Checker Review",
      href: "/your-orders-as-artist/for-review",
    },
  ]

  if (isChangeRequestArtist) {
    navItems.push({
      name: 'Waiting for Customer Review',
      href: '/your-orders-as-artist/for-customer-review',
    })
  }

  navItems.push({
    name: "Completed",
    href: "/your-orders-as-artist/completed",
  })

  return navItems
}