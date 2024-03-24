import { TypographyH2 } from "@/components/ui/typography"
import UserGroupsDataTable from "./_components/UserGroupsDataTable"
import AddEditUserGroupDialog from "./_components/AddEditUserGroupDialog"
import { getUserGroups } from "./_lib/userGroupQueries"

export default async function UserGroupsPage() {
  const userGroups = await getUserGroups()

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>User Groups</TypographyH2>
      <div className="self-end">
        <AddEditUserGroupDialog />
      </div>
      <UserGroupsDataTable data={userGroups} />
    </div>
  )
}
