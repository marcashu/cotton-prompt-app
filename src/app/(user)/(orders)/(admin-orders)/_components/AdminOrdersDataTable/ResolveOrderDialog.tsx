import { resolveOrder } from "@/components/modules/orders/orderActions"
import { KeyedMutator } from "swr"
import { useToast } from "@/components/ui/use-toast"
import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import GetOrdersModel from "@/types/getOrdersModel"
import useSession from "@/hooks/useSession"

export default function ResolveOrderDialog({
  id,
  isDesignSubmitted,
  isRedraw,
  isChangeRequest,
  open,
  mutate,
  handleClose,
}: {
  id: number
  isDesignSubmitted: boolean
  isRedraw: boolean
  isChangeRequest: boolean
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
      title={`Are you sure you want to ${
        isRedraw ? "reject" : "resolve"
      } this order?`}
      description={
        isDesignSubmitted
          ? "This action will return the order to the original artist and checker"
          : isRedraw
          ? "This action will return the order to the CR artist and checker"
          : isChangeRequest
          ? "This action will return the order to the CR checker and make it available for other CR artists to claim"
          : "This action will make this order available for other artists and checkers to claim"
      }
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={handleClose}
    />
  )
}
