import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Control, FieldValues, Path } from "react-hook-form"
import Tiptap from "./Tiptap"

export default function FormTipTap<T extends FieldValues>({
  label,
  control,
  name,
  className,
}: {
  label: string
  control: Control<T>
  name: Path<T>
  className?: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Tiptap value={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
