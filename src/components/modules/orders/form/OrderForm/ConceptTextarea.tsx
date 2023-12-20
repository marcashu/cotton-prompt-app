import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

export default function ConceptTextarea({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  return (
    <FormField
      control={control}
      name="concept"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Concept</FormLabel>
          <FormControl>
            <Textarea className="resize-none" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
