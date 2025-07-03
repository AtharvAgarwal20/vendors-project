import { z } from "zod/v4";

export const vendorSchema = z.object({
  name: z
    .string()
    .min(2, "Name cannot be shorter than 2 letters")
    .max(20, "Name cannot be larger than 20 letters"),
  bankAccNo: z
    .string()
    .nonempty("Bank Account Number cannot be empty")
    .regex(/^\d+$/, "Bank account number can only contain numbers"),
  bankName: z.string().nonempty("Bank Name cannot be empty"),
  addressLine1: z.string().nonempty("Address line 1 cannot be empty"),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  country: z
    .string()
    .regex(
      /^[a-z\s]+$/gi,
      "Country names cannot contain numbers or special characters"
    )
    .optional(),
  zipCode: z.string().optional(),
});
