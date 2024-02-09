import { Role } from "@/enums/role"

type Session = {
  userId: string,
  userRoles: Role[],
  selectedRole?: Role,
  name: string,
}

export default Session