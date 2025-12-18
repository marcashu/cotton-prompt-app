import { toggleOrderRedrawMark } from "@/components/modules/orders/orderActions"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"

export default function ToggleOrderRedrawMarkDialog({
  id,
  isRedraw,
  open,
  mutate,
  handleClose,
}: {
  id: number
  isRedraw: boolean
  open: boolean
  mutate: () => void
  handleClose: () => void
}) {
  const { toast } = useToast()

  const handleContinue = async () => {
    try {
      await toggleOrderRedrawMark(id)
      mutate()
    } finally {
      handleClose()
      toast({
        title: `Order has been marked as ${
          isRedraw ? "redraw" : "non-redraw"
        } successfully`,
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <ConfirmAlertDialog
      open={open}
      title={`Are you sure you want to mark this report as ${
        isRedraw ? "redraw" : "non-redraw"
      }?`}
      description={`This action will change the 'Redraw Request' column value from ${
        isRedraw ? "'Yes'" : "'No'"
      } to ${isRedraw ? "'No'" : "'Yes'"}.`}
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={handleClose}
    />
  )
}
