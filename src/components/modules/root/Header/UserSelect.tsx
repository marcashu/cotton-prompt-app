import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useSession from "@/hooks/useSession"
import Role from "@/types/role"
import Session from "@/types/session"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const users: Session[] = [
  {
    userId: "de8db725-bd5c-4e7a-be95-d2f91ab88000",
    userRole: "admin",
  },
  {
    userId: "d6e9709b-95a7-461f-a6bf-7e1be4d25a38",
    userRole: "checker",
  },
  {
    userId: "f7e82c4a-633f-40c4-9439-0f1471124830",
    userRole: "artist",
  },
]

export default function UserSelect() {
  const { session, setSession } = useSession()
  const [value, setValue] = useState<Role>(session ? session.userRole : "admin")
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newValue: Role) => {
    setValue(newValue)
    setSession(users.find((u) => u.userRole === newValue)!)
    if (pathname !== "/") router.push("/")
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="checker">Checker</SelectItem>
        <SelectItem value="artist">Artist</SelectItem>
      </SelectContent>
    </Select>
  )
}
