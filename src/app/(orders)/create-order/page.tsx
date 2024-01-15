import OrderForm from "@/components/modules/orders/form/OrderForm"
import OrderPageHeader from "@/components/modules/orders/OrderPageHeader"

export default function CreateOrderPage() {
  return (
    <div>
      <OrderPageHeader
        title="Create Order"
        description="Fill-in the form to create an order."
      />
      <OrderForm />
    </div>
  )
}
