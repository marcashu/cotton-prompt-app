import Role from "./role"

type Session = {
  userId: string,
  userRole: Role,
  name: string,
}

export default Session