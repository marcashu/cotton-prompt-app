import { normalArtistAvailableOrdersKey, normalCheckerAvailableOrdersKey, priorityArtistAvailableOrdersKey, priorityCheckerAvailableOrdersKey } from "./ordersListConstants"

export const getOrderListKey = (userRole: string, priority: boolean) => {
  const result = userRole === "artist"
    ? priority
      ? priorityArtistAvailableOrdersKey
      : normalArtistAvailableOrdersKey
    : priority
      ? priorityCheckerAvailableOrdersKey
      : normalCheckerAvailableOrdersKey
  return result
}