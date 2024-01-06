import { Button } from "@/components/ui/button"
import { getDesignBracketOrdersCount } from "../designBracketService"
import {
  deleteDesignBracket,
  disableDesignBracket,
} from "../designBracketActions"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import useSession from "@/hooks/useSession"

export default function DesignBracketItemDelete({
  id,
  readOnly,
  disableAll,
  setDisableAll,
}: {
  id: number
  readOnly: boolean
  disableAll: boolean
  setDisableAll: (value: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  const [ordersCount, setOrdersCount] = useState(0)
  const { toast } = useToast()
  const { session } = useSession()
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingDisable, setLoadingDisable] = useState(false)

  if (!session) return <></>

  const handleDelete = () => {
    setDisableAll(true)
    setLoadingDelete(true)
    getDesignBracketOrdersCount(id).then(({ count }) => {
      if (count > 0) {
        setOrdersCount(count)
        setOpen(true)
      } else {
        deleteDesignBracket(id)
          .then(() =>
            toast({
              title: "Design bracket has been deleted successfully",
              description: new Date().toLocaleString(),
            })
          )
          .finally(() => {
            setDisableAll(false)
            setLoadingDelete(false)
          })
      }
    })
  }

  const handleClose = () => {
    setDisableAll(false)
    setOpen(false)
    setLoadingDelete(false)
    setLoadingDisable(false)
  }

  const handleDisable = () => {
    setDisableAll(true)
    setLoadingDisable(true)
    disableDesignBracket(id, session.userId)
      .then(() =>
        toast({
          title: "Design bracket has been disabled successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => handleClose())
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={!readOnly ? "hidden" : ""}
        disabled={disableAll}
        onClick={handleDelete}
        loading={loadingDelete}
      >
        Delete
      </Button>
      <Button
        type="button"
        variant="outline"
        className={!readOnly ? "hidden" : ""}
        disabled={disableAll}
        onClick={handleDisable}
        loading={loadingDisable}
      >
        Disable
      </Button>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Unable to delete this design bracket
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cannot delete this design bracket because it is used by{" "}
              {ordersCount} order/s.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisable}>
              Disable Instead?
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
