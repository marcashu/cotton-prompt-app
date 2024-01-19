import { TypographyH2 } from "@/components/ui/typography"
import Link from "next/link"
import OrderDataTables from "../_components/OrderDataTables"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Orders</TypographyH2>
      <div className="self-end">
        <Button asChild>
          <Link href="/create-order">Create Order</Link>
        </Button>
      </div>
      <OrderDataTables />
    </div>
  )
}
