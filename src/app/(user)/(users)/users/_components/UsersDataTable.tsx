"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUsersModel from "@/types/getUsersModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import ChangeRoleDialog from "./ChangeRoleDialog"
import Role from "@/enums/role"
import { TypographySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"

const columnDef: ColumnDef<GetUsersModel>[] = [
  {
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
    header: "Roles",
    cell: ({ row }) => {
      const user = row.original

      if (!user.roles.length) return "-"

      return (
        <div className="flex gap-2">
          {user.roles.map((ur) => (
            <Badge
              variant={
                ur === Role.Admin
                  ? "default"
                  : ur === Role.Checker
                  ? "secondary"
                  : "outline"
              }
              key={ur}
            >
              {ur}
            </Badge>
          ))}
        </div>
      )
    },
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
