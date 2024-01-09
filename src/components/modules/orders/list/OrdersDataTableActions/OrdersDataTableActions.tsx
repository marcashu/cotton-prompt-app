"use client"

import { Button } from "@/components/ui/button"
import GetOrdersModel from "@/types/getOrdersModel"
import { Row } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import DeleteOrderDialog from "./DeleteOrderDialog"
import Link from "next/link"
import useSession from "@/hooks/useSession"
import ClaimOrderButton from "./ClaimOrderButton"
import { usePathname } from "next/navigation"

export default function OrdersDataTableActions({
  row,
}: {
  row: Row<GetOrdersModel>
}) {
  const order = row.original
  const { session } = useSession()
  const pathname = usePathname()

  if (!session) return <></>

  const getActions = () => {
    if (session.userRole === "admin") {
      return (
        <>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/orders/${order.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteOrderDialog id={order.id} priority={order.priority} />
        </>
      )
    }

    if (pathname === "/orders/available") {
      return <ClaimOrderButton id={order.id} priority={order.priority} />
    }

    if (pathname === "/orders/your") {
      return (
        <Button asChild>
          <Link href={`/orders/${order.id}/view`}>View</Link>
        </Button>
      )
    }

    return <></>
  }

  return <div className="flex justify-end gap-2">{getActions()}</div>
}
