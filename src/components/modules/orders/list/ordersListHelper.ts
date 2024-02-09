import { CellContext } from "@tanstack/react-table"
import { Role } from "@/enums/role"
import GetOrdersModel from "@/types/getOrdersModel"
import ClaimOrderButton from "./OrdersDataTableActions/ClaimOrderButton"
import CanDoModel from "@/types/canDoModel"

export const getArtistActionCell = (canClaim: CanDoModel, mutateKey: string) => {
  return ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    return (
      ClaimOrderButton({
        id: order.id,
        mutateKey,
        canClaim,
        role: Role.Artist,
      })
    )
  }
}

export const getCheckerActionCell = (userId: string, mutateKey: string) => {
  return ({ row }: CellContext<GetOrdersModel, unknown>) => {
    const order = row.original
    const canClaim: CanDoModel =
      userId === order.artistId
        ? {
          canDo: false,
          message: "You can't claim an order if you are the artist",
        }
        : {
          canDo: true,
          message: "",
        }

    return (
      ClaimOrderButton({
        id: order.id,
        mutateKey,
        canClaim,
        role: Role.Checker,
      })
    )
  }
}