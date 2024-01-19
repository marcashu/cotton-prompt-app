import Role from "@/types/role"
import { normalArtistAvailableOrdersKey, normalCheckerAvailableOrdersKey, priorityArtistAvailableOrdersKey, priorityCheckerAvailableOrdersKey } from "./ordersListConstants"

export const getOrderListKey = (userRole: Role, priority: boolean) => {
  const result = userRole === "Artist"
    ? priority
      ? priorityArtistAvailableOrdersKey
      : normalArtistAvailableOrdersKey
    : priority
      ? priorityCheckerAvailableOrdersKey
      : normalCheckerAvailableOrdersKey
  return result
}