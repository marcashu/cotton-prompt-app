"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUsersModel from "@/types/getUsersModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import ChangeRoleDialog from "./ChangeRoleDialog"
import { Role } from "@/app/_lib/userConstants"
import { TypographySmall } from "@/components/ui/typography"

const columnDef: ColumnDef<GetUsersModel>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original
      return (
        // <Link href={`/users/${user.id}`} className="font-medium">
        //   {user.name}
        // </Link>
        <TypographySmall>{user.name}</TypographySmall>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    accessorFn: (user) => (user.roles.length > 0 ? user.roles.join(", ") : "-"),
    header: "Roles",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex gap-2 justify-end">
          {/* <Button variant="outline" asChild>
            <Link href={`/users/${user.id}`}>View</Link>
          </Button> */}
          <ChangeRoleDialog id={user.id} roles={user.roles} />
        </div>
      )
    },
  },
]

export default function UsersDataTable({ data }: { data: GetUsersModel[] }) {
  return <DataTable columns={columnDef} data={data} />
}
