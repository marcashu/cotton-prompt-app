import SessionContext from "@/contexts/SessionContext"
import Session from "@/types/session"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<Session>()
  const router = useRouter()

  useEffect(() => {
    if (!session) return

    const redirectPath =
      session.selectedRole === "Admin"
        ? "/orders"
        : session.selectedRole === "Checker"
        ? "/available-orders-as-checker"
        : session.selectedRole === "Artist"
        ? `/available-orders-as-artist/${session.userId}`
        : "/no-role"
    router.replace(redirectPath)
  }, [session, router])

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
