import OrderForm from "@/components/modules/orders/form/OrderForm"
import PageHeaderWithBack from "@/app/(user)/_components/PageHeaderWithBack"

export default function CreateOrderPage() {
  return (
    <div>
      <PageHeaderWithBack
        title="Create Order"
        description="Fill-in the form to create an order."
      />
      <OrderForm />
    </div>
  )
}
