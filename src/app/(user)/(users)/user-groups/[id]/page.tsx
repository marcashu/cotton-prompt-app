import { getUserGroupById } from "../_lib/userGroupQueries"
import UserGroupUsersDataTable from "./_components/UserGroupUsersDataTable"
import PageHeaderWithBack from "@/app/(user)/_components/PageHeaderWithBack"
import AddEditUserGroupDialog from "../_components/AddEditUserGroupDialog"

export default async function UserGroupDetailsPage({
  params,
}: {
  params: { id: number }
}) {
  const userGroup = await getUserGroupById(params.id)

  return (
    <div className="flex flex-col gap-4">
      <PageHeaderWithBack title={userGroup.name} />
      <div className="self-end">
        <AddEditUserGroupDialog userGroup={userGroup} />
      </div>
      <UserGroupUsersDataTable data={userGroup.users} />
    </div>
  )
}
