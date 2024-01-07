import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, createRef, useState } from "react"
import { updatePrintColors } from "../printColorActions"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { getPrintColorOrdersCount } from "../printColorService"
import { cn } from "@/lib/utils"
import useSession from "@/hooks/useSession"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"

export default function PrintColorItemEdit({
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
  const [value, setValue] = useState(initialValue)
  const [open, setOpen] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0)
  const { toast } = useToast()
  const { session } = useSession()
  const [loading, setLoading] = useState(false)

  if (!session) return <></>

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!value) return

    setDisableAll(true)

    try {
      setLoading(true)
      const { count } = await getPrintColorOrdersCount(id)

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
    await updatePrintColors(id, value, session.userId)
    setReadOnly(true)
    setOpen(false)
    toast({
      title: "Print color has been updated successfully",
      description: new Date().toLocaleString(),
    })
    setLoading(false)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  const enableEdit = () => {
    setReadOnly(false)
    inputRef.current?.focus()
  }

  const disableEdit = () => {
    setValue(initialValue)
    setReadOnly(true)
    setOpen(false)
  }

  return (
    <>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          className={cn("w-[350px]", readOnly && "border-transparent")}
          value={value}
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
        title="Are you sure you want to edit this Print Color?"
        description={`This print color is used by ${ordersCount} orders. Updating this
        will also affect those order/s.`}
        confirmButtonCaption="Continue"
        onConfirm={proceedUpdate}
        onCancel={disableEdit}
      />
    </>
  )
}
