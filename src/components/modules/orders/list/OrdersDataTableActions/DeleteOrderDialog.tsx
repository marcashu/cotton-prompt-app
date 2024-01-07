import { deleteOrder } from "../../orderActions"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"
import { normalOrdersKey, priorityOrdersKey } from "../ordersListConstants"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"

export default function DeleteOrderDialog({
  id,
  priority,
}: {
  id: number
  priority: boolean
}) {
  const [open, setOpen] = useState(false)
  const { mutate } = useSWRConfig()
  const { toast } = useToast()

  const handleContinue = async () => {
    try {
      await deleteOrder(id)
      mutate(priority ? priorityOrdersKey : normalOrdersKey)
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
      <Button variant="outline" size="icon" onClick={handleOpen}>
        <Trash className="h-4 w-4" />
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
