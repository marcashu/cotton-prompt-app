import { Role } from "@/app/_lib/userConstants"

type GetUsersModel = {
  id: string
  name: string
  email: string
  roles: Role[]
}

export default GetUsersModel