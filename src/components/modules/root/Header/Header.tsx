"use client"

import HeaderMenu from "./HeaderMenu"
import UserSelect from "./UserSelect"

export default function Header() {
  return (
    <div className="flex items-center px-6">
      <div className="grow">
        <HeaderMenu />
      </div>
      {/* TODO Remove <UserSelect/> */}
      <UserSelect />
    </div>
  )
}
