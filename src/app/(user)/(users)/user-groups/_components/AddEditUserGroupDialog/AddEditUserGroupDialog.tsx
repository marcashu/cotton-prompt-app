"use client"

import Input from "@/components/custom/Input"
import MultiSelect from "@/components/custom/MultiSelect"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import GetUsersModel from "@/types/getUsersModel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"
import * as z from "zod"
import { createUserGroup, updateUserGroup } from "../../_lib/userGroupActions"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import GetUserGroupModel from "@/types/getUserGroupModel"

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Please enter user group name.",
    })
    .max(100, {
      message: "User group name must not be longer than 100 characters.",
    }),
  userIds: z.string().array(),
})

type AddUserGroupFormType = z.infer<typeof formSchema>

export default function AddEditUserGroupDialog({
  userGroup,
}: {
  userGroup?: GetUserGroupModel
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { fetcher } = useSWRConfig()
  const { data, trigger, isMutating } = useSWRMutation(
    "/api/users/registered",
    fetcher!
  )
  const form = useForm<AddUserGroupFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userGroup?.name,
      userIds: userGroup?.users.map((u) => u.id),
    },
  })
  const { session } = useSession()
  const { toast } = useToast()

  if (!session || !session.userId) return <></>

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      trigger()
    } else {
      form.reset()
    }
    setOpen(newOpen)
  }

  const handleSubmit = (formData: AddUserGroupFormType) => {
    setLoading(true)

    if (!userGroup) {
      createUserGroup(formData.name, formData.userIds, session.userId)
        .then(() =>
          toast({
            title: "User group has been created successfully",
            description: new Date().toLocaleString(),
          })
        )
        .finally(() => {
          setLoading(false)
          handleOpenChange(false)
        })
    } else {
      updateUserGroup(
        userGroup.id,
        formData.name,
        formData.userIds,
        session.userId
      )
        .then(() =>
          toast({
            title: "User group has been updated successfully",
            description: new Date().toLocaleString(),
          })
        )
        .finally(() => {
          setLoading(false)
          handleOpenChange(false)
        })
    }
  }

  const title = `${!userGroup ? "Add" : "Edit"} User Group`

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mr-4">{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Input control={form.control} label="Group Name" name="name" />
            <MultiSelect
              options={
                (data as GetUsersModel[])?.map((u) => ({
                  value: u.id,
                  label: u.name,
                })) ?? []
              }
              defaultValue={userGroup?.users.map((u) => ({
                value: u.id,
                label: u.name,
              }))}
              name="userIds"
              control={form.control}
              label="Users"
              loading={isMutating}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="ml-2" loading={loading}>
                {!userGroup ? "Submit" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
