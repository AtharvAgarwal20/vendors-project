import z from "zod";

export const vendorSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name cannot be shorter than 2 letters" })
    .max(20, { message: "Name cannot be larger than 20 letters" }),
  bankAccNo: z.string(),
  bankName: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
});
