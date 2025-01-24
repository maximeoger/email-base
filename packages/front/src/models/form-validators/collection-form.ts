import { z } from "zod";



export const collectionFormSchema = (messages: {
  name_required: string;
  name_max_length: string;
  description_max_length: string;
}) => z.object({
  name: z
    .string({ required_error: messages.name_required })
    .max(25, { message: messages.name_max_length }),
  description: z
    .string()
    .max(255, { message: messages.description_max_length })
    .optional(),
});
