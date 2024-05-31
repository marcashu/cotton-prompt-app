import { changeRequestOrder } from "@/components/modules/orders/orderActions"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import ChangeRequestImageReferenceUrls from "./ChangeRequestImageReferenceUrls"
import ImageReferenceModel from "@/types/imageReferenceModel"

const formSchema = z.object({
  comment: z
    .string({
      required_error: "Please enter a comment.",
    })
    .min(1, { message: "Please enter a comment." }),
  imageReferences: z
    .array(
      z
        .object({
          type: z.literal("Link").or(z.literal("File")),
          value: z.string(),
          name: z.string(),
          filePreviewUrl: z.string().optional(),
        })
        .refine(
          (val) => {
            if (val.type !== "Link") return true
            return z.string().url().safeParse(val.value).success
          },
          {
            message: "Please enter a valid URL.",
            path: ["value"],
          }
        )
    )
    .optional(),
})

export type ChangeRequestFormType = z.infer<typeof formSchema>

export default function OrderProofChangeRequestButton({
  orderId,
  designId,
  disabled,
}: {
  orderId: number
  designId: number
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<ChangeRequestFormType>({
    resolver: zodResolver(formSchema),
  })

  const handleOpenChange = (newOpen: boolean) => {
    form.reset()
    setOpen(newOpen)
  }

  const handleSubmit = (data: ChangeRequestFormType) => {
    setLoading(true)
    changeRequestOrder(
      orderId,
      designId,
      data.comment,
      (data.imageReferences as ImageReferenceModel[]) ?? []
    )
      .then(() =>
        toast({
          title: "Change request has been submitted successfully",
          description: "You can now safely close this tab.",
          duration: 60000,
        })
      )
      .finally(() => {
        setLoading(false)
        handleOpenChange(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="m-auto w-[300px] rounded-[25px] text-[#3A3A3A] font-bold"
          disabled={disabled}
        >
          REQUEST FOR CHANGES
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-[#f0e9da]"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-[#3A3A3A]">Change Request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#3A3A3A]">Comment</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ChangeRequestImageReferenceUrls control={form.control} />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="orderProofOutline"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="mb-2 md:mb-0 md:ml-2"
                loading={loading}
                variant="orderProofDefault"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
