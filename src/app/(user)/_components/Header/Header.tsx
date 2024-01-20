"use client"

import useSession from "@/hooks/useSession"
import HeaderMenu from "./HeaderMenu"
import RoleSelect from "./RoleSelect"

export default function Header() {
  const { session } = useSession()

  if (!session) return <></>

  return (
    <div className="flex items-center px-6">
      <div className="grow">
        <HeaderMenu />
      </div>
      {session.userRole !== "Artist" && <RoleSelect />}
    </div>
  )
}
