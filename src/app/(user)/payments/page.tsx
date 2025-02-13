"use client"

import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { savePaymentLinkApi } from "./_components/paymentActions"
import Spinner from "@/components/ui/spinner"
import useSession from "@/hooks/useSession"

export default function PaymentsPage() {
  const { session, setSession } = useSession()
  const { toast } = useToast()
  const [paymentLink, setPaymentLink] = useState(
    session && session.paymentLink ? session.paymentLink : ""
  )

  const [isLoading, setIsLoading] = useState(false)

  const savePaymentLink = async () => {
    if (!paymentLink) {
      toast({
        variant: "destructive",
        title: "Payment link is empty",
        description: "Please enter a payment link",
      })

      return
    }

    if (!session?.userId) return

    setIsLoading(true)
    await savePaymentLinkApi(session?.userId, paymentLink)
    setIsLoading(false)

    setSession({
      userId: session.userId,
      userRoles: session.userRoles,
      selectedRole: session.selectedRole,
      name: session.name,
      paymentLink: paymentLink,
    })

    toast({
      variant: "default",
      title: "Payment link has been saved",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Payment Settings</TypographyH2>

      <div className="flex justify-center w-full mt-12">
        <div className="w-full md:w-1/2 flex flex-col gap-3">
          <TypographyP>Enter a payment link</TypographyP>
          <div className="w-full">
            <input
              type="text"
              value={paymentLink}
              onChange={(e) => setPaymentLink(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Payment link"
            />
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button onClick={savePaymentLink}>Save</Button>
          )}
        </div>
      </div>
    </div>
  )
}
