import { reportOrder } from "@/components/modules/orders/orderActions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
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
import { DialogClose } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  redraw: z.boolean().default(false),
  reason: z
    .string()
    .min(1, "Please enter reason.")
    .max(3500, "Reason must not be longer than 3500 characters."),
})

type ReportOrderFormType = z.infer<typeof formSchema>

export default function ReportOrderDialog({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<ReportOrderFormType>({
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()

  const handleOpenChange = (newOpen: boolean) => {
    form.reset()
    setOpen(newOpen)
  }

  const handleSubmit = (data: ReportOrderFormType) => {
    setLoading(true)
    reportOrder(id, data.reason, data.redraw)
      .then(() => {
        toast({
          title: "Order has been reported successfully",
          description: "You may now claim another order.",
        })
        router.back()
      })
      .finally(() => {
        setLoading(false)
        handleOpenChange(false)
      })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive">Report a Problem</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report a Problem</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="redraw"
              render={({ field }) => (
                <FormItem className="flex space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is this a redraw?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
