import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import Input from "@/components/custom/Input"

export default function OrderNumberInput({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  return (
    <Input
      label="Order Number"
      control={control}
      name="orderNumber"
      className={className}
      placeholder="Enter order number"
    />
  )
}
