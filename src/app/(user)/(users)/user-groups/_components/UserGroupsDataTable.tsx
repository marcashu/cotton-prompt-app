"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUserGroupsModel from "@/types/getUserGroupsModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteUserGroup } from "../_lib/userGroupActions"
import { useToast } from "@/components/ui/use-toast"

function DeleteUserGroupButton({ userGroup }: { userGroup: GetUserGroupsModel }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteUserGroup(userGroup.id)
      toast({
        title: "User group deleted",
        description: `"${userGroup.name}" has been deleted.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user group.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User Group</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{userGroup.name}&quot;? This action cannot be undone.
            <br /><br />
            <strong>Note:</strong> Existing orders will still show this user group name.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const columnDef: ColumnDef<GetUserGroupsModel>[] = [
  {
    accessorKey: "name",
    header: "Group Name",
    cell: ({ row }) => {
      const userGroup = row.original
      return (
        <Link href={`/user-groups/${userGroup.id}`} className="font-medium">
          {userGroup.name}
        </Link>
      )
    },
  },
  {
    accessorKey: "membersCount",
    header: "Members",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userGroup = row.original
      return (
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/user-groups/${userGroup.id}`}>View</Link>
          </Button>
          <DeleteUserGroupButton userGroup={userGroup} />
        </div>
      )
    },
  },
]

export default function UserGroupsDataTable({
  data,
}: {
  data: GetUserGroupsModel[]
}) {
  return <DataTable columns={columnDef} data={data} />
}
