import Role from "@/enums/role"

type GetUsersModel = {
  id: string
  name: string
  email: string
  roles: Role[]
  paymentLink: string
}

export default GetUsersModel
