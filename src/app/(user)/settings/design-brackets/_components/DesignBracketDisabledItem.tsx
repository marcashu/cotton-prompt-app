"use client"

import { Button } from "@/components/ui/button"
import { TypographyLarge } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import DesignBracket from "@/types/designBracket"
import { enableDesignBracket } from "../_lib/designBracketActions"
import { useState } from "react"
import useSession from "@/hooks/useSession"
import { DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DesignBracketDisabledItem({
  data,
}: {
  data: DesignBracket
}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { session } = useSession()

  if (!session) return <></>

  const handleEnable = () => {
    setLoading(true)
    enableDesignBracket(data.id, session.userId)
      .then(() =>
        toast({
          title: "Design bracket has been enabled successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => setLoading(false))
  }

  return (
    <li key={data.id} className="flex gap-2 items-center">
      <div>
        <Input className="border-transparent" readOnly value={data.name} />
      </div>
      <TypographyLarge>-</TypographyLarge>
      <div className="relative">
        <DollarSign className="absolute left-2 top-3 h-4 w-4" />
        <Input
          className="w-[100px] pl-8 border-transparent"
          value={data.value}
          readOnly
        />
      </div>
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
