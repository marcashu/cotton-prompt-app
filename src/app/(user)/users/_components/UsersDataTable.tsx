"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUsersModel from "@/types/getUsersModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import ChangeRoleDialog from "./ChangeRoleDialog"

const columnDef: ColumnDef<GetUsersModel>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original
      return (
        <Link href={`/users/${user.id}`} className="font-medium">
          {user.name}
        </Link>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex gap-2 justify-end">
          <Button variant="outline" asChild>
            <Link href={`/users/${user.id}`}>View</Link>
          </Button>
          <ChangeRoleDialog id={user.id} role={user.role} />
        </div>
      )
    },
  },
]

export default function UsersDataTable({ data }: { data: GetUsersModel[] }) {
  return <DataTable columns={columnDef} data={data} />
}
