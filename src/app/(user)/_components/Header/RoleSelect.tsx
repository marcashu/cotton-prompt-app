import Role, { trimAdmin } from "@/enums/role"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TypographySmall } from "@/components/ui/typography"
import useSession from "@/hooks/useSession"
import Session from "@/types/session"
import { useState } from "react"

export default function RoleSelect() {
  const { session, setSession } = useSession()
  const [value, setValue] = useState(session?.selectedRole)

  const options = trimAdmin(session?.userRoles ?? [])

  const handleChange = (newValue: Role) => {
    setValue(newValue)
    setSession({
      ...session,
      selectedRole: newValue,
    } as Session)
  }

  return (
    <div className="flex gap-2 items-center">
      <TypographySmall className="font-normal">Logged in as</TypographySmall>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
