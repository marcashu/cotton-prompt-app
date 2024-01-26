import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import useSWR from "swr"
import OutputSize from "@/types/outputSize"
import Select from "@/components/custom/Select"
import { SelectItem } from "@/components/ui/select"

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
    <Select
      label="Output Size"
      control={control}
      name="outputSizeId"
      className={className}
      placeholder="Select an output size"
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
