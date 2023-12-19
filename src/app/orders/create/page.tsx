import { TypographyH2, TypographyMuted } from "@/components/ui/typography"
import CreateOrderForm from "@/components/modules/orders/create/CreateOrderForm"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreateOrderPage() {
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
            Create Order
            <TypographyMuted>
              Fill-in the form to create an order.
            </TypographyMuted>
          </div>
        </div>
      </TypographyH2>
      <CreateOrderForm />
    </div>
  )
}
