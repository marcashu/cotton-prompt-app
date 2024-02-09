"use client"

import GetUsersModel from "@/types/getUsersModel"
import { useEffect, useState } from "react"
import { authentication } from "@microsoft/teams-js"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Role } from "@/enums/role"
import { UsersComboBox } from "./UsersComboBox"
import { addUser } from "../../_lib/actions"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import RoleCheckboxList from "../RoleCheckboxList"
import { TypographySmall } from "@/components/ui/typography"

const getUnregisteredUsers = async (token: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${baseUrl}/api/users/unregistered`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const result = (await res.json()) as GetUsersModel[]
  return result
}

export default function AddUserDialog() {
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [users, setUsers] = useState<GetUsersModel[]>([])
  const [selectedUserId, setSelectedUserId] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [open, setOpen] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const disableSave = !selectedUserId
  const { session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setSelectedUserId("")
      setSelectedRoles([])
      return
    }

    setLoadingUsers(true)
    authentication
      .getAuthToken()
      .then((token) =>
        getUnregisteredUsers(token)
          .then((data) => setUsers(data))
          .finally(() => setLoadingUsers(false))
      )
      .catch((err) => {
        console.log(err)
        setLoadingUsers(false)
      })
  }, [open])

  if (!session) return <></>

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChangeUser = (newUserId: string) => setSelectedUserId(newUserId)
  const handleChangeRole = (newRoles: Role[]) => setSelectedRoles(newRoles)

  const handleSave = () => {
    const user = users.find((u) => u.id === selectedUserId)
    if (!user) return

    setLoadingSave(true)
    addUser(user.id, user.name, user.email, session.userId, selectedRoles)
      .then(() =>
        toast({
          title: "User has been added successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => {
        setLoadingSave(false)
        setOpen(false)
      })
  }

  return (
    <>
      <Button type="button" onClick={handleOpen}>
        Add User
      </Button>
      <Dialog open={open}>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            <UsersComboBox
              data={users}
              value={selectedUserId}
              loading={loadingUsers}
              onChange={handleChangeUser}
            />
            <div className="flex flex-col gap-2">
              <TypographySmall className="text-base">
                Select Roles
              </TypographySmall>
              <RoleCheckboxList defaultRoles={[]} onChange={handleChangeRole} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loadingSave}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="ml-2"
              onClick={handleSave}
              disabled={disableSave}
              loading={loadingSave}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
