"use client"

import useSession from "@/hooks/useSession"
import { redirect } from "next/navigation"

export default function HomePage() {
  const { session } = useSession()

  if (!session) return <></>

  const redirectPath =
    session.userRole === "admin" ? "/orders" : "/orders/available"
  redirect(redirectPath)
}
