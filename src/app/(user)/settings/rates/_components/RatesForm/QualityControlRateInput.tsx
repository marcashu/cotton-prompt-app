import { Control } from "react-hook-form"
import { RatesFormValues } from "../../_lib/ratesFormSchema"
import Input from "@/components/custom/Input"

export default function QualityControlRateInput({
  control,
  className,
}: {
  control: Control<RatesFormValues>
  className?: string
}) {
  return (
    <Input
      label="Quality Control Rate"
      control={control}
      name="qualityControlRate"
      className={className}
      placeholder="Enter quality control rate"
    />
  )
}
