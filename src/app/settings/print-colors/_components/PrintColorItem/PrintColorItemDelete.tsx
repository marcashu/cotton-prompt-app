import { Button } from "@/components/ui/button"
import { getPrintColorOrdersCount } from "../../_lib/printColorService"
import {
  deletePrintColor,
  disablePrintColor,
} from "../../_lib/printColorActions"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import useSession from "@/hooks/useSession"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"

export default function PrintColorItemDelete({
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
    getPrintColorOrdersCount(id).then(({ count }) => {
      if (count > 0) {
        setOrdersCount(count)
        setOpen(true)
      } else {
        deletePrintColor(id)
          .then(() =>
            toast({
              title: "Print color has been deleted successfully",
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

  const handleDisable = async () => {
    try {
      setDisableAll(true)
      setLoadingDisable(true)
      await disablePrintColor(id, session.userId)
      toast({
        title: "Print color has been disabled successfully",
        description: new Date().toLocaleString(),
      })
    } finally {
      handleClose()
    }
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
      <ConfirmAlertDialog
        open={open}
        title="Unable to delete this print color"
        description={`Cannot delete this print color because it is used by ${ordersCount}
        order/s.`}
        confirmButtonCaption="Disable Instead?"
        onConfirm={handleDisable}
        onCancel={handleClose}
      />
    </>
  )
}
