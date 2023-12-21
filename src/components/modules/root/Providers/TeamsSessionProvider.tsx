import useSession from "@/hooks/useSession"
import { app } from "@microsoft/teams-js"
import { useEffect } from "react"

export default function TeamsSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { setSession } = useSession()

  useEffect(() => {
    app
      .initialize()
      .then(() => {
        app.getContext().then((context) =>
          setSession({
            userId: context.user?.id ?? "",
            userRole: "admin",
          })
        )
        app.notifySuccess()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setSession])

  return children
}
