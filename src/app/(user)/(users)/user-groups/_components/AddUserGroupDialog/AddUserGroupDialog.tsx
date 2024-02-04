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
import { createUserGroup } from "../../_lib/userGroupActions"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"

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

export default function AddUserGroupDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { fetcher } = useSWRConfig()
  const { data, trigger, isMutating } = useSWRMutation(
    "/api/users/registered",
    fetcher!
  )
  const form = useForm<AddUserGroupFormType>({
    resolver: zodResolver(formSchema),
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
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mr-4">Add User Group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User Group</DialogTitle>
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
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
