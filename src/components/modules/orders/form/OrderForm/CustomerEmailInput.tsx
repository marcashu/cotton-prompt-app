import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import Input from "@/components/custom/Input"

export default function CustomerEmailInput({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  return (
    <Input
      label="Customer Email"
      control={control}
      name="customerEmail"
      className={className}
      placeholder="Enter customer email"
    />
  )
}
