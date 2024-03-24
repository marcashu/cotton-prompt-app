import { Button } from "@/components/ui/button"
import { getDesignBracketOrdersCount } from "../../_lib/designBracketService"
import {
  deleteDesignBracket,
  disableDesignBracket,
} from "../../_lib/designBracketActions"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import useSession from "@/hooks/useSession"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"

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

  const handleDisable = async () => {
    try {
      setDisableAll(true)
      setLoadingDisable(true)
      await disableDesignBracket(id, session.userId)
      toast({
        title: "Design bracket has been disabled successfully",
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
        title="Unable to delete this design bracket"
        description={`Cannot delete this design bracket because it is used by ${ordersCount}
        order/s.`}
        confirmButtonCaption="Disable Instead?"
        onConfirm={handleDisable}
        onCancel={handleClose}
      />
    </>
  )
}
