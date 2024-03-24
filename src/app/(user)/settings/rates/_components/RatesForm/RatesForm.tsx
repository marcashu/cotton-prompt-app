"use client"

import RatesModel from "@/types/ratesModel"
import { useForm } from "react-hook-form"
import ratesFormSchema, { RatesFormValues } from "../../_lib/ratesFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import QualityControlRateInput from "./QualityControlRateInput"
import ChangeRequestRateInput from "./ChangeRequestRateInput"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import useSession from "@/hooks/useSession"
import { useToast } from "@/components/ui/use-toast"
import { updateRates } from "../../_lib/ratesActions"

export default function RatesForm({ rates }: { rates: RatesModel }) {
  const { session } = useSession()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<RatesFormValues>({
    resolver: zodResolver(ratesFormSchema),
    defaultValues: {
      qualityControlRate: rates.qualityControlRate,
      changeRequestRate: rates.changeRequestRate,
    },
  })

  if (!session) {
    return <></>
  }

  const onSubmit = (values: RatesFormValues) => {
    setLoading(true)
    updateRates(values, session.userId)
      .then(() =>
        toast({
          title: "Rates has been updated successfully",
          description: new Date().toLocaleString(),
        })
      )
      .catch((err) =>
        toast({
          title: `Something went wrong while updating the rates: ${err}`,
          description: new Date().toLocaleString(),
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4">
          <QualityControlRateInput control={form.control} />
          <ChangeRequestRateInput control={form.control} />
        </div>
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
