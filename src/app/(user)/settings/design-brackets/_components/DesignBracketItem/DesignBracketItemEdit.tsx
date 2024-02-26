import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, createRef, useState } from "react"
import { updateDesignBrackets } from "../../_lib/designBracketActions"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { getDesignBracketOrdersCount } from "../../_lib/designBracketService"
import { cn } from "@/lib/utils"
import useSession from "@/hooks/useSession"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"

export default function DesignBracketItemEdit({
  id,
  initialValue,
  readOnly,
  setReadOnly,
  disableAll,
  setDisableAll,
}: {
  id: number
  initialValue: string
  readOnly: boolean
  setReadOnly: (value: boolean) => void
  disableAll: boolean
  setDisableAll: (value: boolean) => void
}) {
  const inputRef = createRef<HTMLInputElement>()
  const [name, setName] = useState(initialValue)
  const [open, setOpen] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0)
  const { toast } = useToast()
  const { session } = useSession()
  const [loading, setLoading] = useState(false)

  if (!session) return <></>

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name) return

    setDisableAll(true)

    try {
      setLoading(true)
      const { count } = await getDesignBracketOrdersCount(id)

      if (count > 0) {
        setOrdersCount(count)
        setOpen(true)
      } else {
        await proceedUpdate()
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setDisableAll(false)
    }
  }

  const proceedUpdate = async () => {
    await updateDesignBrackets(id, name, 0, session.userId)
    setReadOnly(true)
    setOpen(false)
    toast({
      title: "Design bracket has been updated successfully",
      description: new Date().toLocaleString(),
    })
    setLoading(false)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const enableEdit = () => {
    setReadOnly(false)
    inputRef.current?.focus()
  }

  const disableEdit = () => {
    setLoading(false)
    setName(initialValue)
    setReadOnly(true)
    setOpen(false)
  }

  return (
    <>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          className={cn("w-[350px]", readOnly && "border-transparent")}
          value={name}
          readOnly={readOnly}
          ref={inputRef}
          onChange={handleChange}
        />
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
          disabled={readOnly || disableAll}
          loading={loading}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={disableEdit}
          className={readOnly ? "hidden" : ""}
          disabled={disableAll}
        >
          Cancel
        </Button>
      </form>
      <ConfirmAlertDialog
        open={open}
        title="Are you sure you want to edit this Design Bracket?"
        description={`This design bracket is used by ${ordersCount} orders. Updating this
        will also affect those order/s.`}
        confirmButtonCaption="Continue"
        onConfirm={proceedUpdate}
        onCancel={disableEdit}
      />
    </>
  )
}
