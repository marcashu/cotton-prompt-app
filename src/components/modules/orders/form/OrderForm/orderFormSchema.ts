import * as z from "zod"

const orderFormSchema = z.object({
  orderNumber: z
    .string()
    .min(1, "Please enter order number.")
    .max(50, "Order number must not be longer than 50 characters."),
  priority: z.boolean().default(false).optional(),
  concept: z
    .string()
    .min(1, "Please enter concept.")
    .max(800, "Concept must not be longer thatn 800 characters."),
  printColor: z.string({
    required_error: "Please select a print color."
  }),
  designBracketId: z.string({
    required_error: "Please select a design bracket."
  }),
  imageReferences: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid image reference URL." }),
      })
    )
    .optional(),
})

export type OrderFormValues = z.infer<typeof orderFormSchema>

export default orderFormSchema