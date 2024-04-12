import { Control } from "react-hook-form"
import { RatesFormValues } from "../../_lib/ratesFormSchema"
import Input from "@/components/custom/Input"

export default function ChangeRequestRateInput({
  control,
  className,
}: {
  control: Control<RatesFormValues>
  className?: string
}) {
  return (
    <Input
      label="Change Request Rate"
      control={control}
      name="changeRequestRate"
      className={className}
      placeholder="Enter change request rate"
    />
  )
}
