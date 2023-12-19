import { Control, useFieldArray } from "react-hook-form"
import { CreateOrderFormValues } from "./createOrderFormSchema"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function ImageReferenceUrls({
  control,
  className,
}: {
  control: Control<CreateOrderFormValues>
  className?: string
}) {
  const { fields, append, remove } = useFieldArray({
    name: "imageReferences",
    control: control,
  })

  return (
    <div className={className}>
      <FormLabel>Image References</FormLabel>
      <FormDescription>Add links to the image references.</FormDescription>
      {fields.map((field, index) => (
        <FormField
          control={control}
          key={field.id}
          name={`imageReferences.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Image References</FormLabel>
              <FormDescription className="sr-only">
                Add links to the image references.
              </FormDescription>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Input {...field} />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ value: "" })}
      >
        Add Image Reference
      </Button>
    </div>
  )
}
