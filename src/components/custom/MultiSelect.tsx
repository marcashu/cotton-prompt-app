import Select, { CSSObjectWithLabel } from "react-select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Control, FieldValues, Path } from "react-hook-form"

type Option = {
  value: string
  label: string
}

export default function MultiSelect<T extends FieldValues>({
  options,
  label,
  control,
  name,
  defaultValue,
  loading,
}: {
  options: Option[]
  label: string
  control: Control<T>
  name: Path<T>
  defaultValue?: Option[]
  loading?: boolean
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              defaultValue={defaultValue}
              isMulti
              options={options}
              onChange={(newValue) =>
                field.onChange(newValue.map((o) => o.value))
              }
              isLoading={loading}
              loadingMessage={(obj) => {
                return "Fetching users..."
              }}
              styles={{
                valueContainer: (base: CSSObjectWithLabel) => ({
                  ...base,
                  maxHeight: "150px",
                  overflowY: "auto",
                }),
                menuList: (base: CSSObjectWithLabel) => ({
                  ...base,
                  maxHeight: "100px !important",
                }),
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
