import NavItem from "@/types/navItem";

export const getNavItems = (hasWaitingForCustomer: boolean) => {
  const navItems: NavItem[] = [
    {
      name: "For your Review",
      href: "/your-orders-as-checker/for-review",
    },
    {
      name: "Waiting for Artist Reupload",
      href: "/your-orders-as-checker/for-reupload",
    },
  ]

  if (hasWaitingForCustomer) {
    navItems.push({
      name: 'Waiting for Customer Review (CR)',
      href: '/your-orders-as-checker/for-customer-review',
    })
  }

  navItems.push({
    name: "Completed",
    href: "/your-orders-as-checker/completed",
  },)

  return navItems
}