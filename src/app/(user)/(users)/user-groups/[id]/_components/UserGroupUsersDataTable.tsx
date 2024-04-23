"use client"

import { DataTable } from "@/components/ui/data-table"
import GetUsersModel from "@/types/getUsersModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import Role, { isAdmin, trimAdmin } from "@/enums/role"
import { TypographySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import RemoveUserDialog from "./RemoveUserDialog"

export default function UserGroupUsersDataTable({
  id,
  data,
}: {
  id: number
  data: GetUsersModel[]
}) {
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState("")

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

        const roles = trimAdmin(user.roles)

        return (
          <div className="flex gap-2">
            {roles.map((ur) => (
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
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setUserId(user.id)
                setOpen(true)
              }}
            >
              Remove
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <>
      <RemoveUserDialog
        id={id}
        userId={userId}
        open={open}
        onClose={() => setOpen(false)}
      />
      <DataTable columns={columnDef} data={data} />
    </>
  )
}
