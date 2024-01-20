"use client"

import { Role } from "@/app/_lib/userConstants"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { canUserUpdateRole, updateUserRole } from "../_lib/actions"
import { useToast } from "@/components/ui/use-toast"
import useSession from "@/hooks/useSession"

export default function ChangeRoleDialog({
  id,
  role,
}: {
  id: string
  role: Role
}) {
  const [value, setValue] = useState<Role>(role)
  const { toast } = useToast()
  const { session } = useSession()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!session) return <></>

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleChange = (newValue: Role) => {
    setValue(newValue)
  }

  const handleSave = () => {
    setLoading(true)
    canUserUpdateRole(id, value).then((canDo) => {
      if (canDo.canDo) {
        updateUserRole(id, value, session?.userId)
          .then(() => {
            toast({
              title: "User role has been updated successfully",
              description: new Date().toLocaleString(),
            })
            setOpen(false)
          })
          .finally(() => setLoading(false))
      } else {
        toast({
          title: "Change role failed",
          description: canDo.message,
          variant: "warning",
        })
        setOpen(false)
        setLoading(false)
      }
    })
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={handleOpen}>
        Change Role
      </Button>
      <Dialog open={open}>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Select value={value} onValueChange={handleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.Admin}>{Role.Admin}</SelectItem>
                <SelectItem value={Role.Checker}>{Role.Checker}</SelectItem>
                <SelectItem value={Role.Artist}>{Role.Artist}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="ml-2"
              onClick={handleSave}
              loading={loading}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
