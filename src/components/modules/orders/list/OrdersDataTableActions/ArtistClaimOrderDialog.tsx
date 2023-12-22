import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { assignArtistToOrder } from "../../orderService"
import { useSWRConfig } from "swr"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { normalOrdersKey, priorityOrdersKey } from "../ordersListConstants"
import useSession from "@/hooks/useSession"

export default function ArtistClaimOrderDialog({
  id,
  priority,
}: {
  id: number
  priority: boolean
}) {
  const { session } = useSession()
  const [open, setOpen] = useState(false)
  const { mutate } = useSWRConfig()

  if (!session) return <></>

  const handleClaim = () => {
    assignArtistToOrder(id, session.userId).then(() => {
      setOpen(true)
    })
  }

  const handleClose = () => {
    setOpen(false)
    mutate(
      priority
        ? `${priorityOrdersKey}&hasArtistFilter=true`
        : `${normalOrdersKey}&hasArtistFilter=true`
    )
  }

  return (
    <>
      <Button type="button" onClick={handleClaim}>
        Claim
      </Button>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order Claim</AlertDialogTitle>
            <AlertDialogDescription>
              Order successfully claimed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
