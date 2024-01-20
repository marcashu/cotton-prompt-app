"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUsersModel from "@/types/getUsersModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

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
    cell: ({ row }) => (
      <Button variant="outline" asChild className="float-right">
        <Link href={`/users/${row.original.id}`}>View</Link>
      </Button>
    ),
  },
]

export default function UsersDataTable({ data }: { data: GetUsersModel[] }) {
  return <DataTable columns={columnDef} data={data} />
}
