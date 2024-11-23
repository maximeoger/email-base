import { z } from 'zod'

export const collectionFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).max(25, { message: "Name length must be within 25 characters" }),
  description: z.string().max(255, { message: "Description must be of 255 characters maximum" }).optional()
})