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
      session.userRole === "Admin"
        ? "/orders"
        : session.userRole === "Checker"
        ? "/available-orders-as-checker"
        : `/available-orders-as-artist/${session.userId}`
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
