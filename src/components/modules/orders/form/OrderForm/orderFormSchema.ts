import * as z from "zod"

const orderFormSchema = z.object({
  orderNumber: z
    .string()
    .min(1, "Please enter order number.")
    .max(50, "Order number must not be longer than 50 characters."),
  priority: z.boolean().default(false).optional(),
  concept: z
    .string()
    .refine((value) => value !== '<p style="margin: 0"></p>', { message: 'Please enter concept.' }),
  printColorId: z.string().min(1, "Please select a print color."),
  designBracketId: z.string().min(1, "Please select a design bracket."),
  outputSizeId: z.string().min(1, "Please select an output size."),
  userGroupId: z.string().min(1, "Please select a user group."),
  customerEmail: z.string().email("Please enter a valid email."),
  authorId: z.string().optional(),
  imageReferences: z
    .array(
      z
        .object({
          type: z.literal('Link').or(z.literal('File')),
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

export type OrderFormValues = z.infer<typeof orderFormSchema>

export default orderFormSchema