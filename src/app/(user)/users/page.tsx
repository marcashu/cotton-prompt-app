import { getRegisteredUsers } from "@/app/_lib/userService"
import { Button } from "@/components/ui/button"
import { TypographyH2 } from "@/components/ui/typography"
import UsersDataTable from "./_components/UsersDataTable"

export default async function UsersPage() {
  const users = await getRegisteredUsers()
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Users</TypographyH2>
      <div className="self-end">
        <Button>Add User</Button>
      </div>
      <UsersDataTable data={users} />
    </div>
  )
}
