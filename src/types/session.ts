import { Role } from "@/app/_lib/userConstants"

type Session = {
  userId: string,
  userRole?: Role,
  selectedRole?: Role,
  name: string,
}

export default Session