import { sendOrderForPrinting } from "@/components/modules/orders/orderActions"
import { KeyedMutator } from "swr"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import GetOrdersModel from "@/types/getOrdersModel"
import useSession from "@/hooks/useSession"

export default function SendOrderForPrintingDialog({
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
  const { session } = useSession()

  if (!session) return <></>

  const handleContinue = async () => {
    try {
      await sendOrderForPrinting(id, session.userId)
      mutate()
    } finally {
      handleClose()
      toast({
        title: "Order has been sent for printing successfully",
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <ConfirmAlertDialog
      open={open}
      title="Are you sure you want to send this order for printing?"
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={handleClose}
    />
  )
}
