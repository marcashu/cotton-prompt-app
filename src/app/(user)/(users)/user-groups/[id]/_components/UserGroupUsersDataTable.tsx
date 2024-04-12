"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUsersModel from "@/types/getUsersModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Role, { isAdmin } from "@/enums/role"
import { TypographySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"

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
    header: "Roles",
    cell: ({ row }) => {
      const user = row.original

      if (!user.roles.length) return "-"

      return (
        <div className="flex gap-2">
          {user.roles.map((ur) => (
            <Badge
              variant={
                isAdmin(ur)
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
]

export default function UserGroupUsersDataTable({
  data,
}: {
  data: GetUsersModel[]
}) {
  return <DataTable columns={columnDef} data={data} />
}
