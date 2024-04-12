import { Button } from "@/components/ui/button"
import { useState } from "react"
import { updateDesignBrackets } from "../../_lib/designBracketActions"
import { useToast } from "@/components/ui/use-toast"
import { getDesignBracketOrdersCount } from "../../_lib/designBracketService"
import { cn } from "@/lib/utils"
import useSession from "@/hooks/useSession"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import { DollarSign } from "lucide-react"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import DesignBracket from "@/types/designBracket"
import Input from "@/components/custom/Input"
import { Form } from "@/components/ui/form"
import { TypographyLarge } from "@/components/ui/typography"

const formSchema = z.object({
  name: z.string().min(1).max(50),
  value: z.coerce.number().gt(0),
})

type DesignBracketEditFormType = z.infer<typeof formSchema>

export default function DesignBracketItemEdit({
  id,
  initialValue,
  readOnly,
  setReadOnly,
  disableAll,
  setDisableAll,
}: {
  id: number
  initialValue: DesignBracket
  readOnly: boolean
  setReadOnly: (value: boolean) => void
  disableAll: boolean
  setDisableAll: (value: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0)
  const { toast } = useToast()
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const form = useForm<DesignBracketEditFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValue.name,
      value: initialValue.value,
    },
  })

  if (!session) return <></>

  const handleSubmit = async (data: DesignBracketEditFormType) => {
    setDisableAll(true)

    try {
      setLoading(true)
      const { count } = await getDesignBracketOrdersCount(id)

      if (count > 0) {
        setOrdersCount(count)
        setOpen(true)
      } else {
        await proceedUpdate(data)
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setDisableAll(false)
    }
  }

  const proceedUpdate = async (data: DesignBracketEditFormType) => {
    await updateDesignBrackets(id, data.name, data.value, session.userId)
    setReadOnly(true)
    setOpen(false)
    toast({
      title: "Design bracket has been updated successfully",
      description: new Date().toLocaleString(),
    })
    setLoading(false)
  }

  const enableEdit = () => {
    setReadOnly(false)
  }

  const cancelEdit = () => {
    form.reset()
    setLoading(false)
    setReadOnly(true)
    setOpen(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          className="flex gap-2 items-center"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Input
            inputClassName={cn(readOnly && "border-transparent")}
            control={form.control}
            name="name"
            readOnly={readOnly}
            placeholder="Name"
            hideFormMessage
          />
          <TypographyLarge>-</TypographyLarge>
          <div className="relative">
            <DollarSign className="absolute left-2 top-3 h-4 w-4" />
            <Input
              inputClassName={cn(
                "w-[100px] pl-8",
                readOnly && "border-transparent"
              )}
              control={form.control}
              name="value"
              readOnly={readOnly}
              placeholder="Value"
              hideFormMessage
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={enableEdit}
            className={!readOnly ? "hidden" : ""}
            disabled={disableAll}
          >
            Edit
          </Button>
          <Button
            type="submit"
            className={readOnly ? "hidden" : ""}
            disabled={readOnly || disableAll || !form.formState.isValid}
            loading={loading}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={cancelEdit}
            className={readOnly ? "hidden" : ""}
            disabled={disableAll}
          >
            Cancel
          </Button>
        </form>
      </Form>
      <ConfirmAlertDialog
        open={open}
        title="Are you sure you want to edit this Design Bracket?"
        description={`This design bracket is used by ${ordersCount} orders. Updating this
        will also affect those order/s.`}
        confirmButtonCaption="Continue"
        onConfirm={form.handleSubmit(proceedUpdate)}
        onCancel={cancelEdit}
      />
    </>
  )
}
