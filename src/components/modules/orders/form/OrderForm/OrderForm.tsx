"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import orderFormSchema, { OrderFormValues } from "./orderFormSchema"
import OrderNumberInput from "./OrderNumberInput"
import PriorityCheckbox from "./PriorityCheckbox"
import ConceptTextarea from "./ConceptTextarea"
import PrintColorSelect from "./PrintColorSelect"
import DesignBracketSelect from "./DesignBracketSelect"
import ImageReferenceUrls from "./ImageReferenceUrls"
import useTeamsContext from "@/hooks/useTeamsContext"
import OrderFormDialog from "./OrderFormDialog"
import { useState } from "react"
import { createOrder, updateOrder } from "../../orderService"

export default function OrderForm({ order }: { order?: GetOrderModel }) {
  const teamsContext = useTeamsContext()
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      orderNumber: order?.orderNumber ?? "",
      priority: order?.priority ?? false,
      concept: order?.concept ?? "",
      printColor: order?.printColor ?? "",
      designBracketId: order?.designBracketId.toString() ?? "",
      imageReferences:
        order?.imageReferences.map((ir) => ({ value: ir })) ?? [],
    },
  })
  const [dialogProps, setDialogProps] = useState({
    open: false,
    title: "",
    message: "",
  })

  const onSubmit = (values: OrderFormValues) => {
    const userId = teamsContext?.user?.id

    if (!userId) {
      return
    }

    if (!order) {
      createOrder(values, userId)
        .then(() =>
          setDialogProps({
            open: true,
            title: "Create Order",
            message: "Order successfully created.",
          })
        )
        .catch((err) =>
          setDialogProps({
            open: true,
            title: "Create Order",
            message: `Something went wrong while creating the order: ${err}`,
          })
        )
    } else {
      updateOrder(values, userId, order.id)
        .then(() =>
          setDialogProps({
            open: true,
            title: "Update Order",
            message: "Order successfully updated.",
          })
        )
        .catch((err) =>
          setDialogProps({
            open: true,
            title: "Update Order",
            message: `Something went wrong while updating the order: ${err}`,
          })
        )
    }
  }

  return (
    <>
      <Form {...form} key={order?.id ?? 0}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="max-w-3xl flex flex-col gap-4">
            <OrderNumberInput control={form.control} />
            <PriorityCheckbox control={form.control} />
            <div className="flex gap-4">
              <PrintColorSelect control={form.control} className="grow" />
              <DesignBracketSelect control={form.control} className="grow" />
            </div>
            <ConceptTextarea control={form.control} />
            <ImageReferenceUrls control={form.control} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <OrderFormDialog
        open={dialogProps.open}
        title={dialogProps.title}
        message={dialogProps.message}
      />
    </>
  )
}
