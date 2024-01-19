import useSession from "@/hooks/useSession"
import { useEffect } from "react"
import { app, authentication } from "@microsoft/teams-js"
import { getUsers, loginUser } from "./userService"

export default function TeamsSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { setSession } = useSession()

  useEffect(() => {
    // app
    //   .initialize()
    //   .then(() => {
    //     // app.getContext().then((context) =>
    //     //   setSession({
    //     //     userId: context.user?.id ?? "",
    //     //     userRole: "Admin",
    //     //   })
    //     // )
    //     authentication.getAuthToken().then((token) => {
    //       getUsers(token).finally(() => app.notifySuccess())
    //       // loginUser(token).finally(() => app.notifySuccess())
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // TODO remove setsession here
    setSession({
      userId: "2291182b-0a61-4e6d-a5f1-8f57c71c2989",
      userRole: "Admin",
      name: "Adele Vance - Admin",
    })
  }, [setSession])

  return children
}
