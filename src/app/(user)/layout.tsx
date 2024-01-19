import { Toaster } from "@/components/ui/toaster"
import Header from "../_components/Header"
import Main from "../_components/Main"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Toaster />
    </>
  )
}
