import { TypographyH2 } from "@/components/ui/typography"
import UserGroupsDataTable from "./_components/UserGroupsDataTable"
import AddUserGroupDialog from "./_components/AddUserGroupDialog"
import { getUserGroups } from "./_lib/userGroupQueries"

export default async function UserGroupsPage() {
  const userGroups = await getUserGroups()

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>User Groups</TypographyH2>
      <div className="self-end">
        <AddUserGroupDialog />
      </div>
      <UserGroupsDataTable data={userGroups} />
    </div>
  )
}
