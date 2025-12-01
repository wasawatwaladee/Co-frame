import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/

// export const registerSchema = z.object({
//     email : z.email().min(2, "Email require")
//     .refine(value => emailRegex.test(value) || mobileRegex.test(value), {
//         message : "identity must be a valid email or mobile number"
//     }),
//     firstName : z.string().min(1, "firstName is required").max(20),
//     lastName : z.string().min(1, ":istName is required").max(20),
//     password : z.string().min(4, "password at least 4 characters").max(20),
// 	confirmPassword: z.string().min(4, "confirm password is required"),
//   }).refine(data => data.password === data.confirmPassword, {
// 	message: 'confirmPassword must match password',
// 	path: ['confirmPassword']
// })

export const registerSchema = z.object({
	email: z.string().min(2, "Email or phone-number require")
		.refine(value => emailRegex.test(value) || mobileRegex.test(value), {
			message: 'identity must be email or phone number'
		}),
	firstName: z.string().min(2, "first name is required"),
	lastName: z.string().min(2, "last name is required"),
	password: z.string().min(4, "password at least 4 characters"),
	confirmPassword: z.string().min(4, "confirm password is required"),
}).refine(data => data.password === data.confirmPassword, {
	message: 'confirmPassword must match password',
	path: ['confirmPassword']
}).transform( data => {
 const newValue = {...data}
 delete newValue.confirmPassword;
 return newValue
})


export const loginSchema = z.object({
 email : z.string().min(2, "Email or phone-number require")
 .refine(value => emailRegex.test(value) || mobileRegex.test(value), {
   message : "identity must be a valid email or mobile number"
 }),
 password : z.string().min(4, "password at least 4 characters"),})
 


