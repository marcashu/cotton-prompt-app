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

const users: Session[] = [
  {
    userId: "2291182b-0a61-4e6d-a5f1-8f57c71c2989",
    userRole: "admin",
    name: "Adele Vance - Admin",
  },
  {
    userId: "303be778-c405-4465-8a0e-87e3ada5357e",
    userRole: "checker",
    name: "Diego Siciliani - Checker",
  },
  {
    userId: "e18a7bca-08af-4aa4-8fd0-ba85e7d535eb",
    userRole: "checker",
    name: "Grady Archie - Checker",
  },
  {
    userId: "7704ced6-0b21-4e7a-89a1-44f159903cd5",
    userRole: "artist",
    name: "Isaiah Langer - Artist",
  },
  {
    userId: "15bf3e96-c4b1-49ce-8a72-7e7ce37e47e7",
    userRole: "artist",
    name: "Johanna Lorenz - Artist",
  },
]

export default function UserSelect() {
  const { session, setSession } = useSession()
  const [value, setValue] = useState(session ? session.userId : users[0].userId)

  const handleChange = (newValue: string) => {
    setValue(newValue)
    setSession(users.find((u) => u.userId === newValue)!)
  }

  return (
    <div className="flex gap-2 items-center">
      <TypographySmall className="font-normal">Login as</TypographySmall>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {users.map((u) => (
            <SelectItem key={u.userId} value={u.userId}>
              {u.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
