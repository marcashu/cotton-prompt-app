import GetUserGroupModel from "@/types/getUserGroupModel"
import GetUserGroupsModel from "@/types/getUserGroupsModel"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/UserGroups`

export const getUserGroups = async () => {
  const res = await fetch(baseUrl, {
    next: { tags: ['userGroups'] },
  })

  const result = await res.json()
  return result as GetUserGroupsModel[]
}

export const getUserGroupById = async (id: number) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    next: { tags: [`userGroup:${id}`] },
  })

  const result = await res.json()
  return result as GetUserGroupModel
}