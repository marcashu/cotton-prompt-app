import { app } from "@microsoft/teams-js"
import { createContext, useEffect, useState } from "react"

export const TeamsContext = createContext<app.Context | undefined>(undefined)

export default function TeamsContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [teamsContext, setTeamsContext] = useState<app.Context>()

  useEffect(() => {
    app
      .initialize()
      .then(() => {
        app.getContext().then((context) => setTeamsContext(context))
        app.notifySuccess()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <TeamsContext.Provider value={teamsContext}>
      {children}
    </TeamsContext.Provider>
  )
}
