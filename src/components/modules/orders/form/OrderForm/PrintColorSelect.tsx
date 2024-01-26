import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import { SelectItem } from "@/components/ui/select"
import useSWR from "swr"
import PrintColor from "@/types/printColor"
import Select from "@/components/custom/Select"

export default function PrintColorSelect({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  const { data, isLoading } = useSWR<PrintColor[]>(
    "/api/PrintColors?hasActiveFilter=true&active=true"
  )

  return (
    <Select
      label="Print Color"
      control={control}
      name="printColorId"
      className={className}
      placeholder="Select a print color"
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
