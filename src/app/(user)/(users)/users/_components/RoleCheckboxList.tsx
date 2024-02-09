import { Role } from "@/enums/role"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const items = [
  {
    id: Role.Admin,
    label: Role.Admin,
    values: [Role.Admin, Role.Checker, Role.Artist],
  },
  {
    id: Role.Checker,
    label: Role.Checker,
    values: [Role.Checker, Role.Artist],
  },
  {
    id: Role.Artist,
    label: Role.Artist,
    values: [Role.Artist],
  },
] as const

const FormSchema = z.object({
  items: z.array(z.string()),
})

export default function RoleCheckboxList({
  defaultRoles,
  onChange,
}: {
  defaultRoles: Role[]
  onChange: (value: Role[]) => void
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: defaultRoles,
    },
  })

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? Array.from(
                                    new Set([...field.value, ...item.values])
                                  )
                                : field.value?.filter(
                                    (value) => value !== item.id
                                  )
                              onChange(newValue as Role[])
                              return field.onChange(newValue)
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
