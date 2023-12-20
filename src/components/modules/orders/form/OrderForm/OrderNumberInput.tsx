import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"

export default function OrderNumberInput({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  return (
    <FormField
      control={control}
      name="orderNumber"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Order Number</FormLabel>
          <FormControl>
            <Input placeholder="Enter order number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
