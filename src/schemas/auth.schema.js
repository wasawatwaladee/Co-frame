import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/

export const registerSchema = z.object({
    email : z.email().min(2, "Email require")
    .refine(value => emailRegex.test(value) || mobileRegex.test(value), {
        message : "identity must be a valid email or mobile number"
    }),
    firstName : z.string().min(1, "firstName is required").max(20),
    lastName : z.string().min(1, ":istName is required").max(20),
    password : z.string().min(4, "password at least 4 characters").max(20),
    mobile: z.string().min(4, "phone-number require").max(20),
})


export const loginSchema = z.object({
 email : z.string().min(2, "Email or phone-number require")
 .refine(value => emailRegex.test(value) || mobileRegex.test(value), {
   message : "identity must be a valid email or mobile number"
 }),
 password : z.string().min(4, "password at least 4 characters"),})
 

export const userProfileSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional().nullable(),
});
