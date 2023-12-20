import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PrintColorSelect({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  return (
    <FormField
      control={control}
      name="printColor"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Print Color</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a print color" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Color1">Color 1</SelectItem>
              <SelectItem value="Color2">Color 2</SelectItem>
              <SelectItem value="Color3">Color 3</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
