import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteOrder } from "../../orderService"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"
import { normalOrdersKey, priorityOrdersKey } from "../ordersListConstants"
import { useToast } from "@/components/ui/use-toast"

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

  const handleContinue = () => {
    deleteOrder(id)
      .then(() => {
        mutate(priority ? priorityOrdersKey : normalOrdersKey)
      })
      .finally(() => {
        setOpen(false)
        toast({
          title: "Order has been deleted successfully",
          description: new Date().toLocaleString(),
        })
      })
  }

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="outline" size="icon" onClick={handleOpen}>
        <Trash className="h-4 w-4" />
      </Button>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this order?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
