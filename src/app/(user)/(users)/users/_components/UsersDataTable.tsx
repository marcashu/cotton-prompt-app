"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import GetUsersModel from "@/types/getUsersModel"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import ChangeRoleDialog from "./ChangeRoleDialog"
import Role, { isAdmin, trimAdmin } from "@/enums/role"
import { TypographySmall } from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import useSession from "@/hooks/useSession"
import GetUserGroupsModel from "@/types/getUserGroupsModel"

const getColumnDef = (
  isSuperAdmin: boolean,
  userGroups: GetUserGroupsModel[]
) => {
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
      header: "User Group",
      cell: ({ row }) => {
        const user = row.original
        if (!user.groups) return "-"
        const userGroup = userGroups.find((ug) => `${ug.id}` === user.groups[0])
        return userGroup ? userGroup.name : "-"
      },
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
        const disabled = !isSuperAdmin && user.roles.includes(Role.SuperAdmin)

        return (
          <div className="flex gap-2 justify-end">
            {/* <Button variant="outline" asChild>
              <Link href={`/users/${user.id}`}>View</Link>
            </Button> */}
            <ChangeRoleDialog
              id={user.id}
              roles={user.roles}
              disabled={disabled}
            />
          </div>
        )
      },
    },
  ]

  return columnDef
}

export default function UsersDataTable({
  data,
  userGroups,
}: {
  data: GetUsersModel[]
  userGroups: GetUserGroupsModel[]
}) {
  const { session } = useSession()

  if (!session) return <></>

  const isSuperAdmin = session.selectedRole === Role.SuperAdmin
  const columnDef = getColumnDef(isSuperAdmin, userGroups)

  return <DataTable columns={columnDef} data={data} />
}
