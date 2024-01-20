import { normalArtistAvailableOrdersKey, normalCheckerAvailableOrdersKey, priorityArtistAvailableOrdersKey, priorityCheckerAvailableOrdersKey } from "./ordersListConstants"
import { Role } from "@/app/_lib/userConstants"

export const getOrderListKey = (userRole: Role, priority: boolean) => {
  const result = userRole === Role.Artist
    ? priority
      ? priorityArtistAvailableOrdersKey
      : normalArtistAvailableOrdersKey
    : priority
      ? priorityCheckerAvailableOrdersKey
      : normalCheckerAvailableOrdersKey
  return result
}