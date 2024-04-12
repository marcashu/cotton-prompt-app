import { Control, FieldValues, Path } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select as DefaultSelect,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import Spinner from "../ui/spinner"
import { ReactNode } from "react"

export default function Select<T extends FieldValues>({
  label,
  control,
  name,
  className,
  placeholder,
  loading,
  children,
}: {
  label: string
  control: Control<T>
  name: Path<T>
  className?: string
  placeholder: string
  loading: boolean
  children: ReactNode
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <DefaultSelect
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                {!loading ? (
                  <SelectValue placeholder={placeholder} />
                ) : (
                  <Spinner />
                )}
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </DefaultSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
