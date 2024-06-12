import { resendOrderForCustomerReview } from "@/components/modules/orders/orderActions"
import { KeyedMutator } from "swr"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import GetOrdersModel from "@/types/getOrdersModel"
import AdminStatus from "@/enums/adminStatus"

export default function ResendOrderForCustomerReviewDialog({
  id,
  open,
  mutate,
  handleClose,
  adminStatus,
}: {
  id: number
  open: boolean
  mutate: KeyedMutator<GetOrdersModel[]>
  handleClose: () => void
  adminStatus: AdminStatus
}) {
  const { toast } = useToast()

  const handleContinue = async () => {
    try {
      await resendOrderForCustomerReview(id)
      mutate()
    } finally {
      handleClose()
      toast({
        title: "Order has been resent to the customer successfully",
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <ConfirmAlertDialog
      open={open}
      title="Are you sure you want to resend this order to the customer?"
      {...((adminStatus === AdminStatus.Completed ||
        adminStatus === AdminStatus.Rejected ||
        adminStatus === AdminStatus.SentForPrinting) && {
        description:
          'This action will revert the customer status to "For Review" and return the order to "Ongoing"',
      })}
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={handleClose}
    />
  )
}
