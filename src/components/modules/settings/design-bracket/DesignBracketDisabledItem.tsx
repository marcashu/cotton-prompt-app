"use client"

import { Button } from "@/components/ui/button"
import { TypographySmall } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import DesignBracket from "@/types/designBracket"
import { enableDesignBracket } from "./designBracketActions"
import { useState } from "react"
import useSession from "@/hooks/useSession"

export default function DesignBracketDisabledItem({
  data,
}: {
  data: DesignBracket
}) {
  const { toast } = useToast()
  const [disable, setDisable] = useState(false)
  const { session } = useSession()

  if (!session) return <></>

  const handleEnable = () => {
    setDisable(true)
    enableDesignBracket(data.id, session.userId)
      .then(() =>
        toast({
          title: "Design bracket has been enabled successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => setDisable(false))
  }

  return (
    <li key={data.id} className="flex gap-2">
      <TypographySmall className="font-normal px-3 py-2 w-[350px]">
        {data.value}
      </TypographySmall>
      <Button
        type="button"
        variant="outline"
        disabled={disable}
        onClick={handleEnable}
      >
        Enable
      </Button>
    </li>
  )
}
