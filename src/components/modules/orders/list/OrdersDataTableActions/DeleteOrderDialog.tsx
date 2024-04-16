import { deleteOrder } from "../../orderActions"
import { KeyedMutator } from "swr"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import GetOrdersModel from "@/types/getOrdersModel"

export default function DeleteOrderDialog({
  id,
  mutate,
}: {
  id: number
  mutate: KeyedMutator<GetOrdersModel[]>
}) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleContinue = async () => {
    try {
      await deleteOrder(id)
      mutate()
    } finally {
      setOpen(false)
      toast({
        title: "Order has been deleted successfully",
        description: new Date().toLocaleString(),
      })
    }
  }

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        Delete
      </Button>
      <ConfirmAlertDialog
        open={open}
        title="Are you sure you want to delete this order?"
        description="This action cannot be undone. This will permanently delete the
        order."
        confirmButtonCaption="Continue"
        onConfirm={handleContinue}
        onCancel={handleClose}
      />
    </>
  )
}
