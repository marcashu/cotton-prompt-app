import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useSession from "@/hooks/useSession"
import { ChangeEvent, FormEvent, useState } from "react"
import { postComment } from "../designActions"
import { useToast } from "@/components/ui/use-toast"
import { TypographySmall } from "@/components/ui/typography"
import CheckerStatus from "@/enums/checkerStatus"
import { KeyedMutator } from "swr"
import GetOrderModel from "@/types/getOrderModel"

export default function OrderViewDesignComment({
  id,
  orderId,
  checkerStatus,
  mutate,
  isAdmin = false,
}: {
  id: number
  orderId: number
  checkerStatus: string
  mutate: KeyedMutator<GetOrderModel>
  isAdmin?: boolean
}) {
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const { session } = useSession()
  const { toast } = useToast()

  if (!session) return <></>

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setComment(event.target.value)

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!comment) return

    setLoading(true)
    postComment(
      id,
      comment,
      isAdmin ? "00000000-0000-0000-0000-000000000000" : session.userId,
      orderId
    )
      .then(() => {
        mutate()
        if (checkerStatus === CheckerStatus.ForReview) {
          toast({
            title: "Order has been requested for reupload!",
            description: new Date().toLocaleString(),
          })
        } else {
          toast({
            title: "Comment has been posted successfully",
            description: new Date().toLocaleString(),
          })
        }
        setComment("")
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      {!isAdmin && (
        <TypographySmall className="font-normal">
          Note: Only add a comment if the design requires changes, otherwise
          click &quot;Approve&quot;
        </TypographySmall>
      )}
      <form className="flex w-full gap-2" onSubmit={handleSend}>
        <Input
          type="text"
          className="grow"
          placeholder="Write a comment..."
          value={comment}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={!comment}
          loading={loading}
        >
          Send
        </Button>
      </form>
    </>
  )
}
