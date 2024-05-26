import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import FormTipTap from "@/components/custom/Tiptap/FormTiptap"

export default function ConceptTextarea({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  return (
    <FormTipTap
      label="Concept"
      control={control}
      name="concept"
      className={className}
    />
  )
}
