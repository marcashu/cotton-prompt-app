import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useSession from "@/hooks/useSession"
import { ChangeEvent, FormEvent, useState } from "react"
import { postComment } from "../designService"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function OrderViewDesignComment({ id }: { id: number }) {
  const [comment, setComment] = useState<string>()
  const { session } = useSession()
  const { toast } = useToast()
  const router = useRouter()

  if (!session) return <></>

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setComment(event.target.value)

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!comment) return

    postComment(id, comment, session.userId).then(() => {
      toast({
        title: "Comment has been posted successfully",
        description: new Date().toLocaleString(),
      })
      setComment("")
      router.refresh()
    })
  }

  return (
    <form className="flex w-full gap-2" onSubmit={handleSend}>
      <Input
        type="text"
        className="grow"
        placeholder="Write a comment..."
        value={comment}
        onChange={handleChange}
      />
      <Button type="submit" disabled={!comment}>
        Send
      </Button>
    </form>
  )
}
