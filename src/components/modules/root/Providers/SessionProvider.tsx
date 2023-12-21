import SessionContext from "@/contexts/SessionContext"
import Session from "@/types/session"
import { useState } from "react"

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<Session>()

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
