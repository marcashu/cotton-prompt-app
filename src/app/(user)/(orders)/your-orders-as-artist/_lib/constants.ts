import NavItem from "@/types/navItem";

export const getNavItems = (userId: string, isChangeRequestArtist: boolean) => {
  const navItems: NavItem[] = [
    {
      name: "For your Upload",
      href: `/your-orders-as-artist/${userId}/for-upload`,
    },
    {
      name: "Waiting for Checker Review",
      href: `/your-orders-as-artist/${userId}/for-review`,
    },
  ]

  if (isChangeRequestArtist) {
    navItems.push({
      name: 'Waiting for Customer Review (CR)',
      href: `/your-orders-as-artist/${userId}/for-customer-review`,
    })
  }

  navItems.push({
    name: "Completed",
    href: `/your-orders-as-artist/${userId}/completed`,
  })

  return navItems
}