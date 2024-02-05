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
import { useState } from "react"
import { canUserUpdateRole, updateUserRole } from "../_lib/actions"
import { useToast } from "@/components/ui/use-toast"
import useSession from "@/hooks/useSession"
import RoleCheckboxList from "./RoleCheckboxList"

export default function ChangeRoleDialog({
  id,
  roles,
}: {
  id: string
  roles: Role[]
}) {
  const [value, setValue] = useState<Role[]>(roles)
  const { toast } = useToast()
  const { session, setSession } = useSession()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!session) return <></>

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleChange = (newValue: Role[]) => {
    setValue(newValue)
  }

  const handleSave = () => {
    setLoading(true)
    canUserUpdateRole(id, value).then((canDo) => {
      if (canDo.canDo) {
        updateUserRole(id, session.userId, value)
          .then(() => {
            toast({
              title: "User role has been updated successfully",
              description: new Date().toLocaleString(),
            })
            setOpen(false)

            if (id === session.userId) {
              setSession({
                ...session,
                userRoles: value,
              })
            }
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
        Change Roles
      </Button>
      <Dialog open={open}>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Change Roles</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <RoleCheckboxList defaultRoles={roles} onChange={handleChange} />
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
