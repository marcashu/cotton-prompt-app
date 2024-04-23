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
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ConfirmAlertDialog({
  open,
  title,
  description,
  confirmButtonCaption,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  description?: string
  confirmButtonCaption: string
  onConfirm: () => Promise<void>
  onCancel: () => void
}) {
  const [loading, setLoading] = useState(false)

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {!!description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => {
                setLoading(true)
                onConfirm().finally(() => setLoading(false))
              }}
              loading={loading}
            >
              {confirmButtonCaption}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
