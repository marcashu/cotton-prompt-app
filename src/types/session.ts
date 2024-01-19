import Role from "./role"

type Session = {
  userId: string,
  userRole: Role,
  selectedRole: Role,
  name: string,
}

export default Session