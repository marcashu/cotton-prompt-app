import { Role } from "@/app/_lib/userConstants"

type GetUsersModel = {
  id: string
  name: string
  email: string
  role: Role
}

export default GetUsersModel