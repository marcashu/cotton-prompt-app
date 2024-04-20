import { deleteOrder } from "../../orderActions"
import { KeyedMutator } from "swr"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import GetOrdersModel from "@/types/getOrdersModel"

export default function DeleteOrderDialog({
  id,
  open,
  mutate,
  handleClose,
}: {
  id: number
  open: boolean
  mutate: KeyedMutator<GetOrdersModel[]>
  handleClose: () => void
}) {
  const { toast } = useToast()

  const handleContinue = async () => {
    try {
      await deleteOrder(id)
      mutate()
    } finally {
      handleClose()
      toast({
        title: "Order has been deleted successfully",
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <ConfirmAlertDialog
      open={open}
      title="Are you sure you want to delete this order?"
      description="This action cannot be undone. This will permanently delete the
        order."
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={handleClose}
    />
  )
}
