import { TypographyH2, TypographyMuted } from "@/components/ui/typography"
import OrderForm from "@/components/modules/orders/form/OrderForm"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { getOrderById } from "@/components/modules/orders/orderService"

export default async function EditOrderPage({
  params,
}: {
  params: { id: number }
}) {
  const order = await getOrderById(params.id)

  return (
    <div>
      <TypographyH2 className="mb-4">
        <div className="flex gap-2">
          <Button variant="link" size="icon" asChild className="mr-2">
            <Link href={"/orders"}>
              <ChevronLeft className="h-5 w-5" strokeWidth={4} />
            </Link>
          </Button>
          <div>
            Edit Order
            <TypographyMuted>View or edit this order.</TypographyMuted>
          </div>
        </div>
      </TypographyH2>
      <OrderForm order={order} />
    </div>
  )
}
