import { Control } from "react-hook-form"
import { RatesFormValues } from "../../_lib/ratesFormSchema"
import Input from "@/components/custom/Input"

export default function ConceptAuthorRateInput({
  control,
  className,
}: {
  control: Control<RatesFormValues>
  className?: string
}) {
  return (
    <Input
      label="Concept Author Rate"
      control={control}
      name="conceptAuthorRate"
      className={className}
      placeholder="Enter concept author rate"
    />
  )
}
