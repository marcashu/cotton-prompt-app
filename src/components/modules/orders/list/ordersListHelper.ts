import { normalCheckerAvailableOrdersKey, priorityCheckerAvailableOrdersKey } from "./ordersListConstants"
import { Role } from "@/app/_lib/userConstants"

export const getOrderListKey = (userRole: Role, priority: boolean, userId?: string) => {
  const result = userRole === Role.Artist
    ? `/api/orders/available-as-artist?artistId=${userId}&priority=${priority}`
    : priority
      ? priorityCheckerAvailableOrdersKey
      : normalCheckerAvailableOrdersKey
  return result
}