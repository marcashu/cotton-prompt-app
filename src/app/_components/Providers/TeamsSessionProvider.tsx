import useSession from "@/hooks/useSession"
import { useEffect } from "react"
import { app, authentication } from "@microsoft/teams-js"
import { loginUser } from "../../_lib/userService"
import { useToast } from "@/components/ui/use-toast"

export default function TeamsSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { setSession } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    app
      .initialize()
      .then(() => {
        authentication.getAuthToken().then((token) => {
          loginUser(token)
            .then((user) =>
              setSession({
                userId: user.id,
                userRoles: user.roles,
                selectedRole: user.roles[0],
                name: user.name,
              })
            )
            .catch(({ message }: { message: string }) => {
              toast({
                variant: "destructive",
                title: "Something went wrong while trying to login",
                description: `${message}. Please try again later.`,
              })
            })
            .finally(() => app.notifySuccess())
        })
      })
      .catch(({ message }: { message: string }) => {
        toast({
          variant: "destructive",
          title: "Something went wrong while initiating the app",
          description: `${message}. Please try again later.`,
        })
      })
  }, [setSession, toast])

  return children
}
