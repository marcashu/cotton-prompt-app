import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import useSWR from "swr"
import DesignBracket from "@/types/designBracket"
import Select from "@/components/custom/Select"
import { SelectItem } from "@/components/ui/select"

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
    <Select
      label="Design Bracket"
      control={control}
      name="designBracketId"
      className={className}
      placeholder="Select a design bracket"
      loading={isLoading}
    >
      {!!data &&
        data?.length > 0 &&
        data.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.value}
          </SelectItem>
        ))}
    </Select>
  )
}
