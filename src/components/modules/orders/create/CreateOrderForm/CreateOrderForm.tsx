"use client"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import createOrderFormSchema, {
  CreateOrderFormValues,
} from "./createOrderFormSchema"
import OrderNumberInput from "./OrderNumberInput"
import PriorityCheckbox from "./PriorityCheckbox"
import ConceptTextarea from "./ConceptTextarea"
import PrintColorSelect from "./PrintColorSelect"
import DesignBracketSelect from "./DesignBracketSelect"
import ImageReferenceUrls from "./ImageReferenceUrls"
import useTeamsContext from "@/hooks/useTeamsContext"
import useSWRMutation from "swr/mutation"
import CreateOrderDialog from "./CreateOrderDialog"
import { useState } from "react"

async function createOrder(
  url: string,
  { arg }: { arg: CreateOrderFormValues }
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...arg,
      imageReferences: arg.imageReferences?.map((ir) => ir.value),
    }),
  })

  if (!res.ok) {
    throw new Error()
  }
}

export default function CreateOrderForm() {
  const teamsContext = useTeamsContext()
  const form = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      orderNumber: "",
      priority: false,
      concept: "",
      imageReferences: [],
      createdBy: teamsContext?.user?.id,
    },
  })
  const { trigger } = useSWRMutation("/api/Orders", createOrder)
  const [dialogProps, setDialogProps] = useState({
    open: false,
    message: "",
  })

  const onSubmit = (values: CreateOrderFormValues) => {
    trigger(values)
      .then(() =>
        setDialogProps({
          open: true,
          message: "Succesfully created an order.",
        })
      )
      .catch((err) =>
        setDialogProps({
          open: true,
          message: `Something went wrong while creating the order: ${err}`,
        })
      )
  }

  return (
    <>
      <Form {...form}>
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
      <CreateOrderDialog
        open={dialogProps.open}
        message={dialogProps.message}
      />
    </>
  )
}
