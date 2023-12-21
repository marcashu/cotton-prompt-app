import Session from "@/types/session"
import { createContext } from "react"

type SessionContextType = {
  session?: Session
  setSession: (session: Session) => void
}

const SessionContext = createContext<SessionContextType>({
  setSession: (_) => { }
})

export default SessionContext