import useSession from "@/hooks/useSession"
import { useEffect } from "react"
import { app, authentication } from "@microsoft/teams-js"
import { loginUser } from "../../_lib/userService"

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
        authentication.getAuthToken().then((token) => {
          loginUser(token)
            .then((user) =>
              setSession({
                userId: user.id,
                userRole: user.role,
                selectedRole: user.role,
                name: user.name,
              })
            )
            .finally(() => app.notifySuccess())
        })
      })
      .catch((err) => {
        console.log(err)
        setSession({
          userId: "",
          name: "",
        })
      })
  }, [setSession])

  return children
}
