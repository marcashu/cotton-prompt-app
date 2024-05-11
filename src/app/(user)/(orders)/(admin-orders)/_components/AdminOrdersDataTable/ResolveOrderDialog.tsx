import { resolveOrder } from "@/components/modules/orders/orderActions"
import { KeyedMutator } from "swr"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import GetOrdersModel from "@/types/getOrdersModel"
import useSession from "@/hooks/useSession"

export default function ResolveOrderDialog({
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
      await resolveOrder(id, session.userId)
      mutate()
    } finally {
      handleClose()
      toast({
        title: "Order has been resolved successfully",
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <ConfirmAlertDialog
      open={open}
      title="Are you sure you want to resolve this order?"
      description="This action will make this order available for artists to claim"
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={handleClose}
    />
  )
}
