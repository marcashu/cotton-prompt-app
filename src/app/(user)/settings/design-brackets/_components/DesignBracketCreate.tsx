"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent, FormEvent, useState } from "react"
import { createDesignBracket } from "../_lib/designBracketActions"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"

export default function DesignBracketCreate() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const { toast } = useToast()

  if (!session) return <></>

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    createDesignBracket(name, 0, session.userId)
      .then(() => {
        toast({
          title: "Design bracket has been created successfully",
          description: new Date().toLocaleString(),
        })
        setName("")
      })
      .finally(() => setLoading(false))
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  return (
    <form className="flex w-full gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        className="w-[350px]"
        value={name}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="outline"
        disabled={!name}
        loading={loading}
      >
        Add
      </Button>
    </form>
  )
}
