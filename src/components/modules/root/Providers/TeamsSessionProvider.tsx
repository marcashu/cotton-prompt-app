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
        // TODO remove setsession here
        setSession({
          userId: "de8db725-bd5c-4e7a-be95-d2f91ab88000",
          userRole: "admin",
        })
      })
  }, [setSession])

  return children
}
