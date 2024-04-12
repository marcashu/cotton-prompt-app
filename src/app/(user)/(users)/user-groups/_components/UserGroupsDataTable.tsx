"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUserGroupsModel from "@/types/getUserGroupsModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

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
          <Button variant="outline" asChild>
            <Link href={`/user-groups/${userGroup.id}`}>View</Link>
          </Button>
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
