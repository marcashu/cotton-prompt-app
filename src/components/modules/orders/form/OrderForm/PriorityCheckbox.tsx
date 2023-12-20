import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

export default function PriorityCheckbox({
  control,
}: {
  control: Control<OrderFormValues>
}) {
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem className="flex space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Is this order a priority?</FormLabel>
          </div>
        </FormItem>
      )}
    />
  )
}
