import * as z from "zod"

const orderFormSchema = z.object({
  orderNumber: z
    .string()
    .min(1, "Please enter order number.")
    .max(50, "Order number must not be longer than 50 characters."),
  priority: z.boolean().default(false).optional(),
  concept: z
    .string()
    .min(1, "Please enter concept."),
  printColorId: z.string().min(1, "Please select a print color."),
  designBracketId: z.string().min(1, "Please select a design bracket."),
  outputSizeId: z.string().min(1, "Please select an output size."),
  userGroupId: z.string().min(1, "Please select a user group."),
  customerEmail: z.string().email("Please enter a valid email."),
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