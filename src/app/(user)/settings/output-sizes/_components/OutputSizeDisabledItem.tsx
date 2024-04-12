"use client"

import { Button } from "@/components/ui/button"
import { TypographySmall } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import OutputSize from "@/types/outputSize"
import { enableOutputSize } from "../_lib/outputSizeActions"
import { useState } from "react"
import useSession from "@/hooks/useSession"

export default function OutputSizeDisabledItem({ data }: { data: OutputSize }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { session } = useSession()

  if (!session) return <></>

  const handleEnable = () => {
    setLoading(true)
    enableOutputSize(data.id, session.userId)
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
