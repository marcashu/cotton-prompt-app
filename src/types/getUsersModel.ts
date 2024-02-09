import Role from "@/enums/role"

type GetUsersModel = {
  id: string
  name: string
  email: string
  roles: Role[]
}

export default GetUsersModel