import { acceptOrder } from "@/components/modules/orders/orderActions"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import useSession from "@/hooks/useSession"

export default function CompleteOrderDialog({
  id,
  open,
  mutate,
  handleClose,
}: {
  id: number
  open: boolean
  mutate: () => void
  handleClose: () => void
}) {
  const { toast } = useToast()
  const { session } = useSession()

  if (!session) return <></>

  const handleContinue = async () => {
    try {
      await acceptOrder(id, session.userId)
      mutate()
    } finally {
      handleClose()
      toast({
        title: "Order has been completed successfully",
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <ConfirmAlertDialog
      open={open}
      title="Are you sure you want to complete this order?"
      description="This action will manually complete this order"
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={handleClose}
    />
  )
}
