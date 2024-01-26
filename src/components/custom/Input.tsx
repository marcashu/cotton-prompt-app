import { Control, FieldValues, Path } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input as DefaultInput } from "../ui/input"

export default function Input<T extends FieldValues>({
  label,
  control,
  name,
  className,
  placeholder,
}: {
  label: string
  control: Control<T>
  name: Path<T>
  className?: string
  placeholder: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DefaultInput placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
