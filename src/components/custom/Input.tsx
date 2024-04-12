import { Control, FieldValues, Path } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input as DefaultInput } from "../ui/input"
import { cn } from "@/lib/utils"

export default function Input<T extends FieldValues>({
  label,
  control,
  name,
  className,
  placeholder,
  readOnly,
  inputClassName,
  hideFormMessage,
}: {
  label?: string
  control: Control<T>
  name: Path<T>
  className?: string
  placeholder?: string
  readOnly?: boolean
  inputClassName?: string
  hideFormMessage?: boolean
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, !label && "space-y-0")}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DefaultInput
              placeholder={placeholder}
              readOnly={readOnly}
              className={inputClassName}
              {...field}
            />
          </FormControl>
          {!hideFormMessage && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
