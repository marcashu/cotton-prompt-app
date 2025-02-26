import Role from "@/enums/role"

type GetUsersModel = {
  id: string
  name: string
  email: string
  roles: Role[]
  groups: string[]
  paymentLink: string
}

export default GetUsersModel
