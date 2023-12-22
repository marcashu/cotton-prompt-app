"use client"

import useSession from "@/hooks/useSession"
import { redirect } from "next/navigation"

export default function HomePage() {
  const { session } = useSession()
  const redirectPath =
    session?.userRole === "admin" ? "/orders/all" : "/orders/available"
  redirect(redirectPath)
}
