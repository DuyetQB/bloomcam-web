import { z } from "zod";

export const variantIdSchema = z.enum(["core", "studio-kit"]);

export const preorderVariantSchema = z.object({
  variantId: variantIdSchema,
  quantity: z.number().int().min(1).max(5),
});

export const shippingSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2).max(120),
  line1: z.string().min(3).max(200),
  line2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(2).max(100),
  state: z.string().max(100).optional().or(z.literal("")),
  postalCode: z.string().min(2).max(20),
  country: z.string().min(2).max(2),
  phone: z.string().max(30).optional().or(z.literal("")),
});

export const paymentSchema = z.object({
  paymentMode: z.enum(["RESERVATION", "DEPOSIT", "FULL"]),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms",
  }),
});

export const completePreorderSchema = preorderVariantSchema
  .merge(shippingSchema)
  .merge(paymentSchema)
  .extend({
    locale: z.string(),
    analyticsSessionId: z.string().optional(),
  });

export type CompletePreorderInput = z.infer<typeof completePreorderSchema>;
