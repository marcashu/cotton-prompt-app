"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { createDesignBracket } from "./designBracketActions"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"

export default function DesignBracketCreate() {
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const { toast } = useToast()

  if (!session) return <></>

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    createDesignBracket(value, session.userId)
      .then(() => {
        toast({
          title: "Design bracket has been created successfully",
          description: new Date().toLocaleString(),
        })
        setValue("")
      })
      .finally(() => setLoading(false))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        className="w-[350px]"
        value={value}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="outline"
        disabled={!value}
        loading={loading}
      >
        Add
      </Button>
    </form>
  )
}
