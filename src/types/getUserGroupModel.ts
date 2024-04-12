import GetUsersModel from "./getUsersModel"

type GetUserGroupModel = {
  id: number
  name: string
  users: GetUsersModel[]
}

export default GetUserGroupModel