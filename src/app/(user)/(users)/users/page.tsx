import { getRegisteredUsers } from "@/app/_lib/userService"
import { TypographyH2 } from "@/components/ui/typography"
import UsersDataTable from "./_components/UsersDataTable"
import AddUserDialog from "./_components/AddUserDialog"
import { getUserGroups } from "../user-groups/_lib/userGroupQueries"

export default async function UsersPage() {
  const users = await getRegisteredUsers()
  const userGroups = await getUserGroups()

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Users</TypographyH2>
      <div className="self-end">
        <AddUserDialog />
      </div>
      <UsersDataTable data={users} userGroups={userGroups} />
    </div>
  )
}
