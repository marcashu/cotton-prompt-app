import * as z from "zod"

const ratesFormSchema = z.object({
  qualityControlRate: z.coerce.number().gt(0, "Quality control rate must be greater than 0."),
  changeRequestRate: z.coerce.number().gt(0, "Change request rate must be greater than 0."),
})

export type RatesFormValues = z.infer<typeof ratesFormSchema>

export default ratesFormSchema