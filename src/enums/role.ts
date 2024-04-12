enum Role {
  SuperAdmin = "Super Admin",
  Admin = "Admin",
  Checker = "Checker",
  Artist = "Artist",
}

export const isAdmin = (role?: Role) => {
  return role === Role.Admin || role === Role.SuperAdmin
}

export const trimAdmin = (roles: Role[]) => {
  if (!roles.includes(Role.SuperAdmin)) {
    return roles
  }

  const result = roles.filter(r => r !== Role.Admin)
  return result
}

export default Role