import { Control } from "react-hook-form"
import { CreateOrderFormValues } from "./createOrderFormSchema"
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
import DesignBracket from "@/types/designBracket"
import { Icons } from "@/components/ui/icons"

export default function DesignBracketSelect({
  control,
  className,
}: {
  control: Control<CreateOrderFormValues>
  className?: string
}) {
  const { data, isLoading } = useSWR<DesignBracket[]>("/api/DesignBrackets")

  return (
    <FormField
      control={control}
      name="designBracket"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Design Bracket</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                {!isLoading ? (
                  <SelectValue placeholder="Select a design bracket" />
                ) : (
                  <Icons.spinner className="h-4 w-4 animate-spin m-auto" />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!!data &&
                data?.length > 0 &&
                data.map((designBracket) => (
                  <SelectItem
                    key={designBracket.id}
                    value={designBracket.id.toString()}
                  >
                    {`$${designBracket.value}`}
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
