import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ChangeEvent, FormEvent, createRef, useState } from "react"
import { updateDesignBrackets } from "../designBracketActions"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { getDesignBracketOrdersCount } from "../designBracketService"
import { cn } from "@/lib/utils"
import useSession from "@/hooks/useSession"

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
  const [value, setValue] = useState(initialValue)
  const [open, setOpen] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0)
  const { toast } = useToast()
  const { session } = useSession()

  if (!session) return <></>

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!value) return

    setDisableAll(true)

    try {
      const { count } = await getDesignBracketOrdersCount(id)

      if (count > 0) {
        setOrdersCount(count)
        setOpen(true)
      } else {
        await proceedUpdate()
      }
    } catch (error) {
    } finally {
      setDisableAll(false)
    }
  }

  const proceedUpdate = async () => {
    await updateDesignBrackets(id, value, session.userId)
    setReadOnly(true)
    setOpen(false)
    toast({
      title: "Design bracket has been updated successfully",
      description: new Date().toLocaleString(),
    })
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
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to edit this Design Bracket?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This design bracket is currently used by {ordersCount} orders.
              Updating this will also affect those order/s.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={disableEdit}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={proceedUpdate}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
