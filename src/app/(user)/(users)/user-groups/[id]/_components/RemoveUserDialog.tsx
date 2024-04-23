import ConfirmAlertDialog from "@/components/ui/confirm-alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { removeUser } from "../../_lib/userGroupActions"

export default function RemoveUserDialog({
  id,
  userId,
  open,
  onClose,
}: {
  id: number
  userId: string
  open: boolean
  onClose: () => void
}) {
  const { toast } = useToast()

  const handleContinue = async () => {
    try {
      await removeUser(id, userId)
    } finally {
      onClose()
      toast({
        title: "User has been removed successfully",
        description: new Date().toLocaleString(),
      })
    }
  }

  return (
    <ConfirmAlertDialog
      open={open}
      title="Are you sure you want to remove this user?"
      confirmButtonCaption="Continue"
      onConfirm={handleContinue}
      onCancel={onClose}
    />
  )
}
