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
import useSession from "@/hooks/useSession"
import { createOrder, updateOrder } from "../../orderActions"
import GetOrderModel from "@/types/getOrderModel"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import OutputSizeSelect from "./OutputSizeSelect"
import CustomerEmailInput from "./CustomerEmailInput"
import UserGroupSelect from "./UserGroupSelect"

export default function OrderForm({ order }: { order?: GetOrderModel }) {
  const { session } = useSession()
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      orderNumber: order?.orderNumber ?? "",
      priority: order?.priority ?? false,
      concept: order?.concept ?? "",
      printColorId: order?.printColor.id.toString() ?? "",
      designBracketId: order?.designBracket.id.toString() ?? "",
      outputSizeId: order?.outputSize.id.toString() ?? "",
      userGroupId: order?.userGroupId.toString() ?? "",
      customerEmail: order?.customerEmail ?? "",
      imageReferences:
        order?.imageReferences.map((ir) => ({
          type: ir.type,
          value: ir.value,
          name: ir.name,
        })) ?? [],
    },
  })
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = (values: OrderFormValues) => {
    const userId = session?.userId

    if (!userId) {
      return
    }

    setLoading(true)

    if (!order) {
      createOrder(values, userId)
        .then(() =>
          toast({
            title: "Order has been created successfully",
            description: new Date().toLocaleString(),
          })
        )
        .catch((err) =>
          toast({
            title: `Something went wrong while creating the order: ${err}`,
            description: new Date().toLocaleString(),
            variant: "destructive",
          })
        )
        .finally(() => router.back())
    } else {
      updateOrder(values, userId, order.id)
        .then(() =>
          toast({
            title: "Order has been updated successfully",
            description: new Date().toLocaleString(),
          })
        )
        .catch((err) =>
          toast({
            title: `Something went wrong while updating the order: ${err}`,
            description: new Date().toLocaleString(),
            variant: "destructive",
          })
        )
        .finally(() => router.back())
    }
  }

  return (
    <Form {...form} key={order?.id ?? 0}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="max-w-3xl flex flex-col gap-4">
          <OrderNumberInput control={form.control} />
          <PriorityCheckbox control={form.control} />
          <div className="flex gap-2">
            <PrintColorSelect control={form.control} className="flex-1" />
            <DesignBracketSelect control={form.control} className="flex-1" />
            <OutputSizeSelect control={form.control} className="flex-1" />
          </div>
          <UserGroupSelect control={form.control} />
          <CustomerEmailInput control={form.control} />
          <ConceptTextarea control={form.control} />
          <ImageReferenceUrls control={form.control} />
        </div>
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
