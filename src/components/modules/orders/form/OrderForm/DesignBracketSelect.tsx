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
import DesignBracket from "@/types/designBracket"
import Spinner from "@/components/ui/spinner"

export default function DesignBracketSelect({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  const { data, isLoading } = useSWR<DesignBracket[]>(
    "/api/DesignBrackets?hasActiveFilter=true&active=true"
  )

  return (
    <FormField
      control={control}
      name="designBracketId"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Design Bracket</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                {!isLoading ? (
                  <SelectValue placeholder="Select a design bracket" />
                ) : (
                  <Spinner />
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
                    {designBracket.value}
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
