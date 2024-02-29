"use client"

import { Button } from "@/components/ui/button"
import Input from "@/components/custom/Input"
import { useState } from "react"
import { createDesignBracket } from "../_lib/designBracketActions"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { DollarSign } from "lucide-react"
import { TypographyLarge } from "@/components/ui/typography"

const formSchema = z.object({
  name: z.string().min(1).max(50),
  value: z.coerce.number().gt(0),
})

type DesignBracketCreateFormType = z.infer<typeof formSchema>

export default function DesignBracketCreate() {
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const { toast } = useToast()
  const form = useForm<DesignBracketCreateFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      value: 0,
    },
  })

  if (!session) return <></>

  const handleSubmit = (data: DesignBracketCreateFormType) => {
    setLoading(true)
    createDesignBracket(data.name, data.value, session.userId)
      .then(() => {
        toast({
          title: "Design bracket has been created successfully",
          description: new Date().toLocaleString(),
        })
        form.reset()
      })
      .finally(() => setLoading(false))
  }

  return (
    <Form {...form}>
      <form
        className="flex gap-2 items-center"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Input
          control={form.control}
          name="name"
          placeholder="Name"
          hideFormMessage
        />
        <TypographyLarge>-</TypographyLarge>
        <div className="relative">
          <DollarSign className="absolute left-2 top-3 h-4 w-4" />
          <Input
            inputClassName="w-[100px] pl-8"
            control={form.control}
            name="value"
            placeholder="Value"
            hideFormMessage
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          disabled={!form.formState.isValid}
          loading={loading}
        >
          Add
        </Button>
      </form>
    </Form>
  )
}
