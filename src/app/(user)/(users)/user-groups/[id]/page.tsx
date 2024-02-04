import { revalidateTag } from "next/cache"
import { getUserGroupById } from "../_lib/userGroupQueries"
import UserGroupUsersDataTable from "./_components/UserGroupUsersDataTable"
import PageHeaderWithBack from "@/app/(user)/_components/PageHeaderWithBack"

export default async function UserGroupDetailsPage({
  params,
}: {
  params: { id: number }
}) {
  const userGroup = await getUserGroupById(params.id)
  revalidateTag(`userGroup:${params.id}`)
  return (
    <div className="flex flex-col gap-4">
      <PageHeaderWithBack title={userGroup.name} />
      {/* <div className="self-end">
        <AddUserGroupDialog />
      </div> */}
      <UserGroupUsersDataTable data={userGroup.users} />
    </div>
  )
}
