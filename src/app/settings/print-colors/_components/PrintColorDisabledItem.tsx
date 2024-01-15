"use client"

import { Button } from "@/components/ui/button"
import { TypographySmall } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import PrintColor from "@/types/printColor"
import { enablePrintColor } from "../_lib/printColorActions"
import { useState } from "react"
import useSession from "@/hooks/useSession"

export default function PrintColorDisabledItem({ data }: { data: PrintColor }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { session } = useSession()

  if (!session) return <></>

  const handleEnable = () => {
    setLoading(true)
    enablePrintColor(data.id, session.userId)
      .then(() =>
        toast({
          title: "Print color has been enabled successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => setLoading(false))
  }

  return (
    <li key={data.id} className="flex gap-2">
      <TypographySmall className="font-normal px-3 py-2 w-[350px]">
        {data.value}
      </TypographySmall>
      <Button
        type="button"
        variant="outline"
        loading={loading}
        onClick={handleEnable}
      >
        Enable
      </Button>
    </li>
  )
}
