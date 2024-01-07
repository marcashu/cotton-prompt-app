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
import useSWR from "swr"
import OutputSize from "@/types/outputSize"
import Spinner from "@/components/ui/spinner"

export default function OutputSizeSelect({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  const { data, isLoading } = useSWR<OutputSize[]>(
    "/api/OutputSizes?hasActiveFilter=true&active=true"
  )

  return (
    <FormField
      control={control}
      name="outputSizeId"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Output Size</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                {!isLoading ? (
                  <SelectValue placeholder="Select an output size" />
                ) : (
                  <Spinner />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!!data &&
                data?.length > 0 &&
                data.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.value}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
