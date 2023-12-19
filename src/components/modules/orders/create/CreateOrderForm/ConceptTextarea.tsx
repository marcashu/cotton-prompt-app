import { Control } from "react-hook-form"
import { CreateOrderFormValues } from "./createOrderFormSchema"
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
  control: Control<CreateOrderFormValues>
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
